import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <input
                type="checkbox"
                ref={ref}
                // Customizing checkboxes across browsers using Tailwind requires the forms plugin, 
                // but we can simulate a decent base using standard utility classes
                className={`w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500 focus:ring-2 transition-all ${className}`}
                {...props}
            />
        );
    }
);

Checkbox.displayName = 'Checkbox';
