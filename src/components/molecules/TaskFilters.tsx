import React from 'react';
import { Button } from '../ui/Button';
import type { TaskFiltersProps, FilterType } from '../../types';

export const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange }) => {
    // Array of filter configurations to easily map over them
    const filters: { value: FilterType; label: string }[] = [
        { value: 'ALL', label: 'All' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'COMPLETED', label: 'Completed' },
    ];

    return (
        <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-2 p-1 bg-gray-100 rounded-lg self-start">
            {filters.map((filter) => {
                const isActive = currentFilter === filter.value;
                return (
                    <Button
                        key={filter.value}
                        // If active, use primary style. If inactive, use ghost style to blend into the background.
                        variant={isActive ? 'primary' : 'ghost'}
                        onClick={() => onFilterChange(filter.value)}
                        // Override padding for filter pills
                        className="!px-5 !py-1.5 rounded-md text-sm font-semibold transition-colors"
                        aria-pressed={isActive}
                    >
                        {filter.label}
                    </Button>
                );
            })}
        </div>
    );
};
