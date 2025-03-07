import TaskList from "@/components/TaskList"
import { getTasks } from "../services/actions"

const listTask = async () => {
    const tasks = await getTasks()
    return <TaskList tasks={tasks} />
}

export default listTask