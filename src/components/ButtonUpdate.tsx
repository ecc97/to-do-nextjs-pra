"use client"

interface BtnUpdateProps {
    taskId: number;
    getTasks: () => Promise<void>;
    children: React.ReactNode;
    className?: string;
}

export const BtnUpdate = ({taskId, getTasks, children, className}: BtnUpdateProps) => {
    
    const handleClick = async () => {
        await fetch('http://localhost:3000/api/to-do', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: taskId, }),
        })
        await getTasks()
    }

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    )
}