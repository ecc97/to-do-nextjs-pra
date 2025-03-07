import { NextResponse } from "next/server";
import { getTaskById, updateTask, deleteTask } from "../tasksStore";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const task = getTaskById(id);
    return task
        ? NextResponse.json(task)
        : NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const body = await req.json();
    if (!body.name || !body.description) {
        return NextResponse.json(
            { message: "Missing required fields: name, description" },
            { status: 400 }
        );
    }
    
    const updatedTask = updateTask(id, {
        ...body,
        date: new Date().toLocaleDateString(),
        completed: body.completed ?? false,
    });
    return updatedTask
        ? NextResponse.json(updatedTask)
        : NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const body = await req.json();
    
    const updatedTask = updateTask(id, body);
    return updatedTask
        ? NextResponse.json(updatedTask)
        : NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const deletedTask = deleteTask(id);
    return deletedTask
        ? NextResponse.json(deletedTask)
        : NextResponse.json({ message: "Task not found" }, { status: 404 });
}