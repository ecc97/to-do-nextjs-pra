"use client"
import React from "react";
import { Task } from "@/interface/ITask";

interface TaskListProps {
    tasks: Task[];
}

function TaskList ({ tasks }: {tasks: Task[]}): React.ReactElement<TaskListProps> {
    console.log("TaskList:", tasks)
    

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="">Products</h1>

            <div className="flex gap-2 flex-wrap">
                {tasks.map((task) => {
                    return (
                        <div key={task.id} className="flex flex-col border-2 border-gray-300 rounded-md p-4 items-center">
                            <h2>{task.name}</h2>
                            <p>{task.description}</p>
                            <p>Fecha: {task.date}</p>
                            <p>Completado: {task.completed? "Si" : "No"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskList;
