import { Task } from "@/interface/ITask";

const url = process.env.NEXT_PUBLIC_BASE_URL as string;

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

export const getTaskById = async (taskId: number): Promise<Task> => {
  const res = await fetch(`${url}/api/to-do/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Error al obtener la tarea");
  }

  return res.json();
};