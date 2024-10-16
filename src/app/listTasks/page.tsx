import TaskList from "@/components/TaskList"
import { Task } from "@/interface/ITask"

const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch('http://localhost:3000/api/to-do', {
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
    return(
        <div>
            <TaskList tasks={tasks} />
        </div>
    )
}

export default listTask