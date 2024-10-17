import FormAddTask from "@/components/FormAddTask"

const addTask = () => {
    return (
        <div className="container flex flex-col items-center mx-auto p-12 gap-5">
            <h1 className="text-3xl font-bold">Añadir tarea</h1>
            <FormAddTask />
        </div>
    )
}

export default addTask