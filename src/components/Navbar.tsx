"use client"
import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex justify-center w-full bg-cyan-400 py-5'>
    <ul className='flex gap-5'>
      <li>
        <Link href="/tasks" className='hover:underline'>Lista de Tareas</Link>
      </li>
      <li>
        <Link href="/addTask" className='hover:underline'>Crear Tarea</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar