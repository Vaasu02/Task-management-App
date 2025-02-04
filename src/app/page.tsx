import { getTasks } from "./actions/task";
import { TaskList } from "@/components/TaskList";
import { Toaster } from "@/components/ui/toaster";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { ClientLayout } from "@/components/ClientLayout";

export default async function Home() {
  const { data: tasks = [] } = await getTasks();

  return (
    <ClientLayout>
      <div className="container mx-auto py-10 px-4 min-h-screen">
        <Toaster />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-bold gradient-text text-center sm:text-left">
              Task Management
            </h1>
            <CreateTaskDialog />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-zinc-200">Your Tasks</h2>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 text-lg">No tasks yet. Create one above!</p>
              </div>
            ) : (
              <TaskList tasks={tasks} />
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
