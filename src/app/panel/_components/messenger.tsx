"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  conversationName,
  type ChatUser,
  type Conversation,
  type Message,
  type Profile,
} from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { GradientAvatar } from "./ui/avatar";
import { Add01Icon, ArrowLeft01Icon, BubbleChatIcon, Cancel01Icon, Icon, SentIcon } from "./ui/icons";

function clock(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function ago(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function bump(list: Conversation[], m: Message, myId: string, activeId: string | null): Conversation[] {
  const idx = list.findIndex((c) => c.id === m.conversation_id);
  if (idx === -1) return list;
  const c = list[idx];
  const updated: Conversation = {
    ...c,
    last_message_at: m.created_at,
    lastMessage: { body: m.body, created_at: m.created_at, sender_id: m.sender_id },
    unread: m.conversation_id === activeId || m.sender_id === myId ? c.unread : c.unread + 1,
  };
  return [updated, ...list.filter((x) => x.id !== c.id)];
}

export function Messenger({
  myId,
  initial,
  team,
}: {
  myId: string;
  initial: Conversation[];
  team: Profile[];
}) {
  const supabase = useMemo(() => createClient(), []);
  const [convs, setConvs] = useState<Conversation[]>(initial);
  const [activeId, setActiveId] = useState<string | null>(initial[0]?.id ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [newOpen, setNewOpen] = useState(false);

  const activeRef = useRef(activeId);
  activeRef.current = activeId;
  const idsRef = useRef(new Set(initial.map((c) => c.id)));
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = convs.find((c) => c.id === activeId) ?? null;

  const scrollDown = () =>
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ block: "end" }));

  const markRead = (id: string) =>
    supabase
      .from("conversation_members")
      .update({ last_read_at: new Date().toISOString() })
      .eq("conversation_id", id)
      .eq("profile_id", myId);

  // realtime: new messages across my conversations
  useEffect(() => {
    const ch = supabase
      .channel("panel-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "panel", table: "messages" },
        (payload) => {
          const m = payload.new as Message;
          if (!idsRef.current.has(m.conversation_id)) return;
          if (m.conversation_id === activeRef.current) {
            setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
            markRead(m.conversation_id);
            scrollDown();
          }
          setConvs((prev) => bump(prev, m, myId, activeRef.current));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, myId]);

  // load messages when the active conversation changes
  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    supabase
      .from("messages")
      .select(
        "id,conversation_id,sender_id,body,created_at, sender:profiles!messages_sender_id_fkey(id,full_name,avatar_gradient)",
      )
      .eq("conversation_id", activeId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        setMessages((data as unknown as Message[]) ?? []);
        scrollDown();
      });
    markRead(activeId);
    setConvs((prev) => prev.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c)));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  async function send() {
    const body = draft.trim();
    if (!body || !activeId) return;
    setDraft("");
    const { data } = await supabase
      .from("messages")
      .insert({ conversation_id: activeId, sender_id: myId, body })
      .select("id,conversation_id,sender_id,body,created_at")
      .single();
    if (data) {
      const m = data as unknown as Message;
      setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
      setConvs((prev) => bump(prev, m, myId, activeId));
      scrollDown();
      supabase.from("conversations").update({ last_message_at: m.created_at }).eq("id", activeId);
    }
  }

  async function startConversation(memberIds: string[], title: string) {
    if (!memberIds.length) return;
    if (memberIds.length === 1) {
      const existing = convs.find(
        (c) => !c.is_group && c.members.length === 2 && c.members.some((m) => m.id === memberIds[0]),
      );
      if (existing) {
        setActiveId(existing.id);
        setNewOpen(false);
        return;
      }
    }
    const isGroup = memberIds.length > 1;
    const { data: conv } = await supabase
      .from("conversations")
      .insert({ created_by: myId, is_group: isGroup, title: isGroup ? title.trim() || null : null })
      .select("id,title,is_group,created_by,created_at,last_message_at")
      .single();
    if (!conv) return;
    await supabase
      .from("conversation_members")
      .insert([myId, ...memberIds].map((pid) => ({ conversation_id: conv.id, profile_id: pid })));
    const members = [myId, ...memberIds]
      .map((pid) => team.find((t) => t.id === pid))
      .filter((p): p is Profile => !!p)
      .map((p) => ({ id: p.id, full_name: p.full_name, avatar_gradient: p.avatar_gradient }) as ChatUser);
    idsRef.current.add(conv.id);
    setConvs((prev) => [
      { ...(conv as Omit<Conversation, "members" | "lastMessage" | "unread">), members, lastMessage: null, unread: 0 },
      ...prev,
    ]);
    setActiveId(conv.id);
    setNewOpen(false);
  }

  return (
    <div className="flex h-[calc(100dvh-8rem)] overflow-hidden rounded-xl border border-hairline bg-white">
      {/* conversation list */}
      <aside
        className={cn(
          "flex w-full shrink-0 flex-col border-r border-hairline md:w-80 lg:w-[21rem]",
          activeId && "hidden md:flex",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm font-medium text-ink">Messages</span>
          <button
            onClick={() => setNewOpen(true)}
            aria-label="New conversation"
            className="grid h-8 w-8 place-items-center rounded-lg text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
          >
            <Icon icon={Add01Icon} size={17} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convs.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-grey-2">No conversations yet.</p>
          ) : (
            convs.map((c) => {
              const name = conversationName(c, myId);
              const other = c.members.find((m) => m.id !== myId) ?? c.members[0];
              const activeRow = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-hairline px-4 py-3 text-left outline-none transition-colors hover:bg-fog/60 focus-visible:bg-fog",
                    activeRow && "bg-fog",
                  )}
                >
                  <GradientAvatar seed={other?.id ?? c.id} gradient={other?.avatar_gradient} name={name} size={36} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13px] font-medium text-ink">{name}</span>
                      {c.lastMessage && (
                        <span className="shrink-0 font-mono text-[10px] text-grey-2">
                          {ago(c.lastMessage.created_at)}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-grey">
                        {c.lastMessage
                          ? `${c.lastMessage.sender_id === myId ? "You: " : ""}${c.lastMessage.body}`
                          : "No messages yet"}
                      </span>
                      {c.unread > 0 && (
                        <span className="grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-ink px-1 text-[9px] font-medium text-white">
                          {c.unread}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* thread */}
      <section className={cn("flex min-w-0 flex-1 flex-col", !activeId && "hidden md:flex")}>
        {active ? (
          <>
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <button
                onClick={() => setActiveId(null)}
                aria-label="Back"
                className="-ml-1 grid h-8 w-8 place-items-center rounded-lg text-grey outline-none hover:bg-secondary hover:text-ink md:hidden"
              >
                <Icon icon={ArrowLeft01Icon} size={17} />
              </button>
              {(() => {
                const other = active.members.find((m) => m.id !== myId) ?? active.members[0];
                return (
                  <GradientAvatar
                    seed={other?.id ?? active.id}
                    gradient={other?.avatar_gradient}
                    name={conversationName(active, myId)}
                    size={30}
                  />
                );
              })()}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{conversationName(active, myId)}</p>
                {active.is_group && (
                  <p className="text-[11px] text-grey-2">{active.members.length} members</p>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-fog/40 px-4 py-5">
              {messages.map((m) => {
                const mine = m.sender_id === myId;
                const sender = m.sender ?? active.members.find((x) => x.id === m.sender_id);
                return (
                  <div key={m.id} className={cn("flex items-end gap-2", mine && "flex-row-reverse")}>
                    {!mine && (
                      <GradientAvatar
                        seed={sender?.id ?? "x"}
                        gradient={sender?.avatar_gradient}
                        name={sender?.full_name}
                        size={24}
                      />
                    )}
                    <div className={cn("max-w-[min(78%,42rem)]", mine && "items-end")}>
                      {active.is_group && !mine && (
                        <p className="mb-0.5 pl-1 text-[10px] text-grey-2">{sender?.full_name}</p>
                      )}
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2 text-[14px] leading-snug",
                          mine ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-white text-ink ring-1 ring-hairline",
                        )}
                      >
                        <span className="whitespace-pre-wrap break-words">{m.body}</span>
                      </div>
                      <p className={cn("mt-0.5 px-1 font-mono text-[9px] text-grey-2", mine && "text-right")}>
                        {clock(m.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2 border-t border-hairline p-3"
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Write a message…"
                aria-label="Message"
                className="max-h-32 min-h-[40px] flex-1 resize-none rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-grey-2 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white outline-none transition-[background-color,transform] hover:bg-ink-2 focus-visible:ring-2 focus-visible:ring-ink/25 motion-safe:active:scale-95 disabled:opacity-40"
              >
                <Icon icon={SentIcon} size={17} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <Icon icon={BubbleChatIcon} size={26} className="text-grey-2" />
            <p className="text-sm text-grey-2">Select a conversation, or start a new one.</p>
          </div>
        )}
      </section>

      <NewConversation
        open={newOpen}
        onOpenChange={setNewOpen}
        team={team.filter((t) => t.id !== myId)}
        onStart={startConversation}
      />
    </div>
  );
}

function NewConversation({
  open,
  onOpenChange,
  team,
  onStart,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  team: Profile[];
  onStart: (ids: string[], title: string) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-safe:transition-opacity motion-safe:duration-200" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-12px_rgba(26,26,26,0.28)] outline-none data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 motion-safe:transition-[transform,opacity] motion-safe:duration-200">
          <div className="mb-4 flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium tracking-tight text-ink">
              New conversation
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-8 w-8 place-items-center rounded-lg text-grey outline-none hover:bg-secondary hover:text-ink"
            >
              <Icon icon={Cancel01Icon} size={17} />
            </Dialog.Close>
          </div>

          {selected.length > 1 && (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Group name (optional)"
              aria-label="Group name"
              className="mb-3 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-grey-2 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10"
            />
          )}

          <div className="max-h-64 space-y-1 overflow-y-auto">
            {team.map((t) => {
              const on = selected.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left outline-none transition-colors hover:bg-fog focus-visible:bg-fog",
                    on && "bg-fog",
                  )}
                >
                  <GradientAvatar seed={t.id} gradient={t.avatar_gradient} name={t.full_name} size={30} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{t.full_name}</span>
                    <span className="block truncate text-xs text-grey-2">{t.title ?? "—"}</span>
                  </span>
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full border",
                      on ? "border-ink bg-ink text-white" : "border-border",
                    )}
                  >
                    {on && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path d="M3.5 8.5 6.5 11.5 12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-hairline pt-4">
            <Dialog.Close render={<Button type="button" variant="ghost">Cancel</Button>} />
            <Button
              onClick={() => {
                onStart(selected, title);
                setSelected([]);
                setTitle("");
              }}
              disabled={!selected.length}
              icon={selected.length > 1 ? undefined : SentIcon}
            >
              {selected.length > 1 ? "Create group" : "Start chat"}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
