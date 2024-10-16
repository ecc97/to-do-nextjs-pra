"use client"
import React, {useState} from 'react'
import { Task } from '@/interface/ITask'

const initialTaskState = {
  name: '',
  description: '',
}

function FormAddTask(): React.ReactElement {
  const [task, setTask] = useState<Task>(initialTaskState)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setTask({...task, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch('/api/to-do', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error('Error adding task')
      }
      setTask(initialTaskState)
    } catch (error) {
      console.error("Error:", error);
      setError('Error adding task')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center w-7/12 p-6'>
        <label htmlFor="task">Task:</label>
        <input type="text" value={task.name} onChange={handleChange} className='w-full p-2 rounded-lg text-black' id="task" name="name" required />

        <label htmlFor="description">Description:</label>
        <textarea value={task.description} onChange={handleChange} className='w-full p-4 rounded-lg text-black' id="description" name="description" required />

        <button type="submit" className='bg-sky-900 hover:bg-sky-700 p-4 rounded-3xl text-white mt-4 transition'>Add Task</button>

        {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}

export default FormAddTask