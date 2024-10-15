import { NextResponse } from "next/server";

export interface Task {
    id: number;
    name: string;
    date: string;
    description: string;
    completed: boolean;
}

let taskList: Task[] = [
    {
        id: 1,
        name: "Task 1",
        date: "2022-01-01",
        description: "Task 1 description",
        completed: false,
    },
    {
        id: 2,
        name: "Task 2",
        date: "2022-01-02",
        description: "Task 2 description",
        completed: true,
    }
]

export async function GET(req: Request) {
    const url = new URL(req.url)
    const status = url.searchParams.get("status")

    let filterTask = taskList
    if(!status) return NextResponse.json(taskList)
    if (status === "completed") {
        filterTask = taskList.filter((task) => task.completed)
    } else {
        filterTask = taskList.filter((task) =>!task.completed)
    }
    return NextResponse.json(filterTask)
}

export async function POST(req: Request) {
    const body = await req.json()
    if(!body) return NextResponse.json({
        message: "Invalid request body"
    }, { status: 400})

    if(!body.name ||!body.description) return NextResponse.json({
        message: "Missing required fields: name, date, description"
    }, { status: 400})
    const newTask: Task = {
        id: Date.now(),
        completed: false,
        date: new Date().toLocaleDateString(),
        ...body
    }
    taskList.push(newTask)
    return NextResponse.json(newTask, {status: 201})
}