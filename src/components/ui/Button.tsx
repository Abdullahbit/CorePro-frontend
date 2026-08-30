import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
    variant = 'primary', 
    className = '', 
    children, 
    ...props 
}) => {
    // 1. Base styles applied to ALL buttons
    const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // 2. Determine variant-specific styles
    let variantStyles = '';
    switch (variant) {
        case 'primary':
            variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm';
            break;
        case 'danger':
            // The design shows the delete button as a subtle ghost-like icon button that turns red
            variantStyles = 'text-red-500 hover:bg-red-50 hover:text-red-700 focus:ring-red-500';
            break;
        case 'ghost':
            variantStyles = 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500';
            break;
    }

    return (
        <button 
            className={`${baseStyles} ${variantStyles} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
};
