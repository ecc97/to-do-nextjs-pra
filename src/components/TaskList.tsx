"use client"
import React from "react";
import { Task } from "@/interface/ITask";
import { useTaskList } from "./tasks-hook";
import { BtnUpdate } from "./ButtonUpdateStatus";
import { useRouter } from "next/navigation";
import BtnDelete from "./BtnDelete";
import { Icons } from "./icons";

interface TaskListProps {
    tasks: Task[];
}

function TaskList ({ tasks }: {tasks: Task[]}): React.ReactElement<TaskListProps> {
    console.log("TaskList:", tasks)
    const router = useRouter()
    const {tasks: taskHook, refreshTasks} = useTaskList()

    return (
        <div className="flex flex-col gap-4 justify-center items-center flex-grow p-12">
            <h1 className="text-3xl font-bold">Tareas</h1>

            <div className="flex gap-2 flex-wrap">
                {taskHook.map((task) => {
                    return (
                        <div key={task.id} className="flex flex-col border-2 border-gray-300 rounded-md p-4">
                            <div className="flex gap-2 justify-end pb-2">
                                <button onClick={() => router.push(`/task/${task.id}`)}>{Icons.edit}</button>
                                <BtnDelete taskId={task.id!} getTasks={refreshTasks} />
                            </div>
                            <div className="flex flex-col items-center">
                                <h2>{task.name}</h2>
                                <p>{task.description}</p>
                                <p>Fecha: {task.date}</p>
                                <p>Completado: {task.completed? "Si" : "No"}</p>
                                <BtnUpdate taskId={task.id!} completed={task.completed!} getTasks={refreshTasks} className={`w-full p-2 rounded-lg text-black ${task.completed ? "bg-sky-900 hover:bg-sky-700" : "bg-rose-800 hover:bg-rose-400" } `}>
                                    {task.completed ? "Hecho" : "No hecho" }
                                </BtnUpdate>
                                <input type="checkbox" checked={task.completed} readOnly />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskList;
