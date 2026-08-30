import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/TextInput';
import type { AddTaskFormProps } from '../../types';

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
    // Local state strictly for managing what the user is currently typing
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        // Prevent the default browser behavior of refreshing the page on form submission
        e.preventDefault(); 
        
        // Validation: Prevent submitting empty tasks or just spaces
        if (inputValue.trim() === '') {
            return;
        }
        
        // Pass the new task title up to the parent via the prop function
        onAddTask(inputValue.trim());
        
        // Reset the input field back to empty after a successful submission
        setInputValue(''); 
    };

    return (
        <form 
            onSubmit={handleSubmit}
            // Flex column on mobile, row on slightly larger screens (sm)
            className="flex flex-col sm:flex-row gap-3 w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100"
        >
            <div className="flex-grow">
                {/* Re-using our reusable Atom component! */}
                <TextInput 
                    placeholder="Enter your task here..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    aria-label="New task title"
                />
            </div>
            
            {/* Re-using our reusable Atom component! */}
            <Button type="submit" variant="primary" className="shrink-0 py-3 sm:py-2 h-full">
                + Add Task
            </Button>
        </form>
    );
};
