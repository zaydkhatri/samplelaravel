export interface Task {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}


import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

interface Props {
    tasks: Task[];
}

export default function TasksPage({ tasks }: Props) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/tasks', { title });
        setTitle('');
    };

    const handleDelete = (id: number) => {
        router.delete(`/tasks/${id}`);
    };

    const toggleComplete = (task: Task) => {
        router.put(`/tasks/${task.id}`, {
            title: task.title,
            completed: !task.completed,
        });
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full mb-2"
                        placeholder="New Task"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                        Add Task
                    </button>
                </form>

                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <span
                                onClick={() => toggleComplete(task)}
                                className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''
                                    }`}
                            >
                                {task.title}
                            </span>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
