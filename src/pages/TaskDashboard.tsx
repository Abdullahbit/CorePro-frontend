import React from 'react';
import { Header } from '../components/organisms/Header';
import { TaskManager } from '../components/organisms/TaskManager';
import { StatusMessage } from '../components/molecules/StatusMessage';
import { useTasks } from '../hooks/useTasks';

export const TaskDashboard: React.FC = () => {
    // 1. Extract EVERYTHING from our powerful custom hook!
    // The Dashboard itself has NO complex logic. It just delegates data to children.
    const {
        tasks,
        currentFilter,
        isLoading,
        error,
        totalTasks,
        completedTasks,
        remainingTasks,
        addTask,
        toggleTask,
        deleteTask,
        setFilter,
    } = useTasks();

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6">
            <main className="w-full max-w-2xl flex flex-col gap-4">
                
                <Header 
                    appName="TaskFlow" 
                    description="Effortlessly manage and track your daily tasks." 
                />
                
                {/* 2. Conditional Rendering for Loading and Errors */}
                {isLoading && <StatusMessage type="loading" message="Loading tasks from server..." />}
                {error && <StatusMessage type="error" message={error} />}

                {/* 3. If we are not loading and have no errors, show the Task Manager */}
                {!isLoading && !error && (
                    <TaskManager
                        tasks={tasks}
                        currentFilter={currentFilter}
                        totalTasks={totalTasks}
                        completedTasks={completedTasks}
                        remainingTasks={remainingTasks}
                        onAddTask={addTask}
                        onToggleComplete={toggleTask}
                        onDelete={deleteTask}
                        onFilterChange={setFilter}
                    />
                )}

            </main>
        </div>
    );
};
