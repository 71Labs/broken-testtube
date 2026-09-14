"use client";

import { toast } from "./ui/toast";

/**
 * Runs a server action and gives uniform feedback. Server actions in this app
 * return `{ error }` on failure (undefined on success), so we key off that.
 * Returns true on success, false on failure — callers can revert optimistic
 * state when it's false.
 */
export async function runAction(
  fn: () => Promise<unknown>,
  msg: { success?: string; error?: string } = {},
): Promise<boolean> {
  try {
    const res = await fn();
    const err =
      res && typeof res === "object" && "error" in res
        ? (res as { error?: string }).error
        : undefined;
    if (err) {
      toast.error(msg.error ?? "That didn't go through", { description: err });
      return false;
    }
    if (msg.success) toast.success(msg.success);
    return true;
  } catch (e) {
    toast.error(msg.error ?? "Something went wrong", {
      description: e instanceof Error ? e.message : undefined,
    });
    return false;
  }
}
