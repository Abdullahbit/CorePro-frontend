import React from 'react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import type { TaskItemProps } from '../../types';

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
    return (
        <div className={`flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border transition-all ${
            task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-100 hover:border-blue-200'
        }`}>
            {/* Left side: Checkbox and Title */}
            <div className="flex items-center gap-4 flex-grow min-w-0">
                <Checkbox 
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    aria-label={`Mark task "${task.todo}" as ${task.completed ? 'pending' : 'completed'}`}
                />
                <span className={`text-sm sm:text-base truncate transition-all ${
                    task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'
                }`}>
                    {task.todo}
                </span>
            </div>

            {/* Right side: Status Badge and Delete Button */}
            <div className="flex items-center gap-3 shrink-0">
                {/* Status Badge */}
                <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                </span>

                {/* Delete Button (Danger Ghost variant) */}
                <Button 
                    variant="danger" 
                    onClick={() => onDelete(task.id)}
                    className="!p-2" // override base padding to make it a smaller icon button
                    aria-label={`Delete task "${task.todo}"`}
                >
                    {/* Inline SVG for delete trash can icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Button>
            </div>
        </div>
    );
};
