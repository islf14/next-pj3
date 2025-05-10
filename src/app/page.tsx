import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function loadTasks() {
  return await prisma.task.findMany();
}
// export const revalidate = 60;
// export const dynamic = 'force-dynamic';
export interface Task {
  CreatedAt: Date;
  title: string;
  id: number;
  description: string;
}

export default async function Home() {
  const tasks:Task[] = await loadTasks();
  console.log('length', tasks.length)
  return (
    <section className="container mx-auto mt-4">
      <div className="grid grid-cols-3 gap-3">
        { tasks.map((task) => (
            <TaskCard task={task} key={task.id}/>
          ))
        }
      </div>  
    </section>
  );
}
