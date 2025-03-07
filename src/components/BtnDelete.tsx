"use client"
import React from 'react'
import { Icons } from './icons';

interface BtnDeleteProps {
    taskId: number;
    getTasks: () => Promise<void>;
    // handleDeleteTask: (taskId: number) => void;
}


function BtnDelete({taskId, getTasks}: BtnDeleteProps) {
    const handleDelete = async (taskId: number) => {
        
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            await fetch(`/api/to-do/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await getTasks();
        }
    };
    
  return (
    <button onClick={() => handleDelete(taskId)}>{Icons.delete}</button>
  )
}

export default BtnDelete
