import { useState, useEffect } from 'react';
import type { Task, FilterType } from '../types';

export const useTasks = () => {
    // 1. State Declarations
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Initial Data Fetch (useEffect)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // We set loading to true initially in the useState above
                const response = await fetch('https://dummyjson.com/todos');

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                // The DummyJSON API returns an object with a 'todos' array
                setTasks(data.todos);
            } catch (err) {
                // Handle any errors that occur during the fetch
                setError(err instanceof Error ? err.message : 'Something went wrong while loading tasks.');
            } finally {
                // Ensure loading is set to false whether the fetch succeeds or fails
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []); // Empty dependency array: run only once when the component mounts

    // 3. State Modification Functions
    const addTask = (title: string) => {
        const newTask: Task = {
            id: Date.now(), // Generate a temporary unique ID
            todo: title,
            completed: false,
        };
        // Immutable state update: Create a NEW array with the new task at the beginning
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    };

    const toggleTask = (id: number) => {
        // Immutable state update: Map over the array, create a new object for the toggled task
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        // Immutable state update: Filter out the task that matches the ID
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    // 4. Derived State (Calculated on the fly)
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'PENDING') return !task.completed;
        if (filter === 'COMPLETED') return task.completed;
        return true; // If 'ALL', keep everything
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;

    // 5. Expose what the UI needs
    return {
        // We expose the FILTERED tasks to the UI so it doesn't have to think about filtering
        tasks: filteredTasks,
        currentFilter: filter,
        isLoading,
        error,
        totalTasks,
        completedTasks,
        remainingTasks,
        addTask,
        toggleTask,
        deleteTask,
        setFilter,
    };
};
