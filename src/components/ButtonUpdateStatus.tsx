"use client"

interface BtnUpdateProps {
    taskId: number;
    completed: boolean;
    getTasks: () => Promise<void>;
    children: React.ReactNode;
    className?: string;
}

export const BtnUpdate = ({taskId, completed, getTasks, children, className}: BtnUpdateProps) => {
    
    const handleClick = async () => {
        await fetch(`/api/to-do/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: completed = !completed }),
        })
        await getTasks()
    }

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    )
}