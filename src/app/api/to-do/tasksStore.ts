export interface Task {
    id: number;
    name: string;
    date: string;
    description: string;
    completed: boolean;
}

export let taskList: Task[] = [
    {
        id: 1,
        name: "Task 1",
        date: "2023-01-01",
        description: "Task 1 description",
        completed: false,
    },
    {
        id: 2,
        name: "Task 2",
        date: "2023-01-02",
        description: "Task 2 description",
        completed: true,
    },
    {
        id: 3,
        name: "Task 3",
        date: "2023-01-03",
        description: "Task 3 description",
        completed: true,
    },
]

export const getTaskById = (id: number) => taskList.find((task) => task.id === id);

export const updateTask = (id: number, newData: Partial<Task>) => {
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1) {
        taskList[index] = { ...taskList[index], ...newData };
        return taskList[index];
    }
    return null;
};

export const deleteTask = (id: number) => {
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1) {
        const deleted = taskList.splice(index, 1);
        return deleted[0];
    }
    return null;
};