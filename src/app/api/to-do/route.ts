import { NextResponse } from "next/server";
import { Task, taskList } from "./tasksStore";


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

// export async function PATCH(req: Request) {
//     const body = await req.json()
//     const {id} = body
//     const index = taskList.findIndex((task) => task.id === id)
//     if(index !== -1){
//         taskList[index].completed = !taskList[index].completed
//         return NextResponse.json(taskList[index])
//     } else {
//         return NextResponse.json(
//             { message: "Task not found"},
//             { status: 404}
//         )
//     }
// }