"use client"

import { getTasks } from "@/app/tasks/page";
import { Task } from "@/interface/ITask";
import { useEffect, useState } from "react";


export const useTaskList = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    

    useEffect(() => {

        onMounted()
    }, [])

    const onMounted = async () => {
        const data = await getTasks()
        setTasks(data)
    }

    const refreshTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    return {
        tasks, setTasks, refreshTasks
    }

}