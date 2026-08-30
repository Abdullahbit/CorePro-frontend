export interface Task {
    id: number;
    todo: string; // DummyJSON uses 'todo' for the title
    completed: boolean;
    userId?: number; // Optional, as DummyJSON provides it
}
export type FilterType = 'ALL' | 'PENDING' | 'COMPLETED';

// --- Component Prop Interfaces ---

export interface HeaderProps {
    appName: string;
    description: string;
}

export interface TaskSummaryProps {
    total: number;
    completed: number;
    remaining: number;
}

export interface AddTaskFormProps {
    onAddTask: (title: string) => void;
    // Note: Form handles its own local 'inputValue' state
}

export interface TaskFiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface EmptyStateProps {
    currentFilter: FilterType;
}

export interface StatusMessageProps {
    type: 'loading' | 'error';
    message: string;
}