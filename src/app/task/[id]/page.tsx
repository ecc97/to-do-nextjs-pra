import FormAddTask from '@/components/FormAddTask';

const url = process.env.NEXT_PUBLIC_BASE_URL as string;

export const getTaskById = async ( taskId: number ) => {
  const res = await fetch(`${url}/api/to-do/${taskId}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const task = await res.json();
  return task
}

const EditTaskPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const task = await getTaskById(parseInt(id));
  
  if (!task) {
    return <p>Tarea no encontrada</p>;
  }
  
  return (
    <div className="container flex flex-col items-center mx-auto p-12 gap-5">
      <h1 className="text-3xl font-bold">Editar Tarea</h1>
      <FormAddTask initialTask={task} />
    </div>
  );
};

export default EditTaskPage;