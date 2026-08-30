import React from 'react';
import type { EmptyStateProps } from '../../types';

export const EmptyState: React.FC<EmptyStateProps> = ({ currentFilter }) => {
    // Determine the message based on the current filter state
    let message = 'No tasks found.';
    let subMessage = 'Get started by adding a new task above.';

    if (currentFilter === 'PENDING') {
        message = 'You are all caught up!';
        subMessage = 'No pending tasks left to do.';
    } else if (currentFilter === 'COMPLETED') {
        message = 'No completed tasks yet.';
        subMessage = 'Start working on your pending tasks to see them here.';
    }

    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-200 text-center w-full">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">{message}</h3>
            <p className="mt-1 text-sm text-gray-500">{subMessage}</p>
        </div>
    );
};
