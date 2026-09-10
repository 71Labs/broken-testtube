import { getConversations, getMyProfile, getTeam } from "@/lib/panel/data";
import { Messenger } from "../../_components/messenger";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const [profile, conversations, team] = await Promise.all([
    getMyProfile(),
    getConversations(),
    getTeam(),
  ]);
  if (!profile) return null;

  return <Messenger myId={profile.id} initial={conversations} team={team} />;
}
