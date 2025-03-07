import TaskList from "@/components/TaskList"
import { Task } from "@/interface/ITask"

const url = process.env.NEXT_PUBLIC_BASE_URL as string

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(`${url}/api/to-do`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        
        return data
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

const listTask = async () => {
    const tasks = await getTasks()
    return <TaskList tasks={tasks} />
}

export default listTask