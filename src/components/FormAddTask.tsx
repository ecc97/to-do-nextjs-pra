"use client"
import React, {useEffect,useState} from 'react'
import { Task } from '@/interface/ITask'
import { getTaskById } from "@/app/task/[id]/page";
import { useRouter } from 'next/navigation'


interface FormTaskProps {
  initialTask?: Task;
}

const initialTaskState = {
  name: '',
  description: '',
}

function FormTask({initialTask}: FormTaskProps): React.ReactElement {
  const [task, setTask] = useState<Task>(initialTask ?? initialTaskState)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const onMountedTask = async () => {
      const taskData = await getTaskById(task.id!)
      if (taskData) {
        setTask(taskData)
      }
    }
    onMountedTask()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const isEdit = Boolean(task.id)
      const url = isEdit ? `/api/to-do/${task.id}` : '/api/to-do'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error('Error adding/updating task')
      }
      setTask(initialTaskState)
      router.push('/tasks')
    } catch (error) {
      console.error("Error:", error);
      setError('Error adding/updating task')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center w-7/12 p-6 bg-cyan-500 rounded-lg shadow-lg shadow-blue-500/50'>
        <label htmlFor="task">Nombre de la tarea:</label>
        <input type="text" value={task.name} onChange={handleChange} className='w-full p-2 rounded-lg text-black' id="task" name="name" required />

        <label htmlFor="description">Descripción:</label>
        <textarea value={task.description} onChange={handleChange} className='w-full p-4 rounded-lg text-black' id="description" name="description" required />

        <button type="submit" className={`bg-sky-900 hover:bg-sky-700 p-4 rounded-3xl text-white mt-4 transition ${task.name === "" || task.description === "" ? "cursor-wait" : "cursor-pointer"}`} disabled={task.name === "" || task.description === ""}>{task.id ? "Actualizar" : "Agregar"}</button>

        {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}

export default FormTask