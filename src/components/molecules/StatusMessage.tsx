import React from 'react';
import type { StatusMessageProps } from '../../types';

export const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
    if (type === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center p-8 w-full">
                {/* A simple CSS spinner */}
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">{message}</p>
            </div>
        );
    }

    // Error state
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-xl w-full text-center">
            <svg className="w-8 h-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium">{message}</p>
        </div>
    );
};
