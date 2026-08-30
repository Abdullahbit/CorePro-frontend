import React from 'react';
import type { TaskSummaryProps } from '../../types';

export const TaskSummary: React.FC<TaskSummaryProps> = ({ total, completed, remaining }) => {
    return (
        // Using CSS Grid to perfectly distribute the 3 cards, matching your architecture notes
        <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 w-full">
            
            {/* Total Tasks Card */}
            <div className="flex flex-col items-center sm:items-start justify-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wider">Total Tasks</span>
                <span className="text-xl sm:text-3xl font-black text-gray-900 mt-1">{total}</span>
            </div>

            {/* Completed Tasks Card */}
            <div className="flex flex-col items-center sm:items-start justify-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-wider">Completed</span>
                <span className="text-xl sm:text-3xl font-black text-gray-900 mt-1">{completed}</span>
            </div>

            {/* Remaining Tasks Card */}
            <div className="flex flex-col items-center sm:items-start justify-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                <span className="text-[10px] sm:text-xs font-bold text-orange-600 uppercase tracking-wider">Remaining</span>
                <span className="text-xl sm:text-3xl font-black text-gray-900 mt-1">{remaining}</span>
            </div>

        </div>
    );
};
