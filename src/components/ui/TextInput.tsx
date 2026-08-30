import React, { useId } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; // Optional label for accessibility
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, className = '', id, ...props }, ref) => {
        // Generate a unique ID if one isn't provided, useful for linking label to input
        const inputId = id || useId();
        
        return (
            <div className="w-full">
                {/* 1. Conditionally render the label if provided */}
                {label && (
                    <label htmlFor={inputId} className="sr-only">
                        {label}
                    </label>
                )}
                
                {/* 2. The actual input element with base accessible Tailwind styling */}
                <input
                    id={inputId}
                    ref={ref}
                    className={`w-full px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

TextInput.displayName = 'TextInput'; // Required when using React.forwardRef
