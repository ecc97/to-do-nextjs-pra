import FormAddTask from '@/components/FormAddTask';
import { getTaskById } from '@/app/services/actions';

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