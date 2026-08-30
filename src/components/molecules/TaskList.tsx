import React from 'react';
import { TaskItem } from './TaskItem';
import type { TaskListProps } from '../../types';

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
    return (
        <div className="flex flex-col gap-3 w-full max-h-96 overflow-y-auto pr-2">
            {/* 
              React requires a unique 'key' prop when rendering lists of elements.
              We use task.id because it is guaranteed to be unique for each task.
              Using array index as key is a bad practice if the array can change order/size.
            */}
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
