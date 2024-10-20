"use client"
import React from "react";
import { Task } from "@/interface/ITask";
import { useTaskList } from "./tasks-hook";
import { BtnUpdate } from "./ButtonUpdate";

interface TaskListProps {
    tasks: Task[];
}

function TaskList ({ tasks }: {tasks: Task[]}): React.ReactElement<TaskListProps> {
    console.log("TaskList:", tasks)
    
    const {tasks: taskHook, refreshTasks} = useTaskList()
    return (
        <div className="flex flex-col gap-4 justify-center items-center flex-grow p-12">
            <h1 className="text-3xl font-bold">Tareas</h1>

            <div className="flex gap-2 flex-wrap">
                {taskHook.map((task) => {
                    return (
                        <div key={task.id} className="flex flex-col border-2 border-gray-300 rounded-md p-4 items-center">
                            <h2>{task.name}</h2>
                            <p>{task.description}</p>
                            <p>Fecha: {task.date}</p>
                            <p>Completado: {task.completed? "Si" : "No"}</p>
                            <BtnUpdate taskId={task.id!} getTasks={refreshTasks} className={`w-full p-2 rounded-lg text-black ${task.completed ? "bg-sky-900 hover:bg-sky-700" : "bg-rose-800 hover:bg-rose-400" } `}>
                                {task.completed ? "Hecho" : "No hecho" }
                            </BtnUpdate>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskList;
