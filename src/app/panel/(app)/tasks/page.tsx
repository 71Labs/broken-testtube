import { getMyProfile, getProjects, getTasks, getTeam } from "@/lib/panel/data";
import { PageHeader } from "../../_components/page-header";
import { NewTask } from "../../_components/new-task";
import { TaskBoard } from "../../_components/task-board";

export const metadata = { title: "Tasks" };

export default async function TasksPage() {
  const [profile, tasks, projects, team] = await Promise.all([
    getMyProfile(),
    getTasks(),
    getProjects(),
    getTeam(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  return (
    <>
      <PageHeader title="Tasks" subtitle="The whole team's board. Move a card as work progresses.">
        <NewTask projects={projects} team={team} isAdmin={isAdmin} />
      </PageHeader>
      <TaskBoard
        tasks={tasks}
        team={team}
        isAdmin={isAdmin}
        myId={profile.id}
        createSlot={<NewTask projects={projects} team={team} isAdmin={isAdmin} variant="card" />}
      />
    </>
  );
}
