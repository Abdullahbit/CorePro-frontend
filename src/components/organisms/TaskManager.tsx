import React from 'react';
import { TaskSummary } from '../molecules/TaskSummary';
import { AddTaskForm } from '../molecules/AddTaskForm';
import { TaskFilters } from '../molecules/TaskFilters';
import { TaskList } from '../molecules/TaskList';
import { EmptyState } from '../molecules/EmptyState';
import type { Task, FilterType } from '../../types';

interface TaskManagerProps {
    tasks: Task[];
    currentFilter: FilterType;
    totalTasks: number;
    completedTasks: number;
    remainingTasks: number;
    onAddTask: (title: string) => void;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onFilterChange: (filter: FilterType) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
    tasks, currentFilter, totalTasks, completedTasks, remainingTasks,
    onAddTask, onToggleComplete, onDelete, onFilterChange
}) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* The Summary section */}
            <TaskSummary 
                total={totalTasks} 
                completed={completedTasks} 
                remaining={remainingTasks} 
            />
            
            {/* The Input section */}
            <AddTaskForm onAddTask={onAddTask} />
            
            {/* The Filters and List section */}
            <div className="flex flex-col gap-4 mt-2">
                <TaskFilters 
                    currentFilter={currentFilter} 
                    onFilterChange={onFilterChange} 
                />
                
                {/* Conditional Rendering based on whether tasks exist for the current filter */}
                {tasks.length > 0 ? (
                    <TaskList 
                        tasks={tasks} 
                        onToggleComplete={onToggleComplete} 
                        onDelete={onDelete} 
                    />
                ) : (
                    <EmptyState currentFilter={currentFilter} />
                )}
            </div>
        </div>
    );
};
