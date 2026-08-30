1. Component Tree (Atomic Breakdown)
To ensure high reusability and a scalable foundation, we will structure the application using an adapted Atomic Design methodology.

Plaintext
Pages
└── TaskDashboard (Main App Component)

Organisms
├── Header (Contains Title & Description)
├── TaskManager (Groups input, summary, and lists)

Molecules
├── TaskSummary (Displays derived counts)
├── AddTaskForm (Form, Input, Button)
├── TaskFilters (Filter buttons group)
├── TaskList (Loops through TaskItems)
├── TaskItem (Individual task row)
├── EmptyState (Dynamic empty messages)
├── StatusMessage (Loading/Error states)

Atoms (Reusable UI Elements)
├── Button (Primary, Danger, Ghost variants)
├── TextInput (Accessible text input)
├── Checkbox (Custom styled accessible checkbox)
Architectural Note: The UI primitives (Button, TextInput, Checkbox) should ideally be extracted into a shared UI library directory (/components/ui/) so they can be reused across future features.

2. State Strategy & Data Flow
For an application of this scope, relying entirely on heavy global state management (like Redux) is overkill. Instead, we will use Local Component State paired with a Custom Hook (useTasks) to encapsulate all logic, keeping our UI components pure and focused on rendering.

State Location: State will live in the top-level TaskDashboard component and be passed down as props.

Custom Hook Extraction: We will create a useTasks hook. This hook will manage:

tasks (Array of Task objects)

filter (Enum: 'ALL' | 'PENDING' | 'COMPLETED')

isLoading (Boolean for the dummyjson fetch)

error (String | null)

Derived State (Calculated on the fly, NOT stored in state):

filteredTasks (Based on current tasks and filter)

totalTasks, completedTasks, remainingTasks (Derived directly from the tasks array length and properties).

3. TypeScript Interfaces
Here are the strict, fully-typed contracts for our data and component props.

TypeScript
// --- Core Domain Models ---

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
4. Layout Architecture (Tailwind CSS)
Instead of basic colors, here is the structural CSS required to build out the responsive Flexbox and Grid layouts.

Global / App Layout:

TaskDashboard: min-h-screen flex flex-col items-center bg-gray-50 py-8 px-4 sm:px-6

MainContainer: w-full max-w-2xl flex flex-col gap-8 (Limits width on desktop, full width on mobile).

Organisms & Molecules Layouts:

Header: flex flex-col items-center sm:items-start gap-2 text-center sm:text-left

TaskSummary: grid grid-cols-3 gap-4 p-4 rounded-lg bg-white shadow-sm (Uses Grid to evenly distribute the three stat blocks).

AddTaskForm: flex flex-col sm:flex-row gap-3 (Stacks input and button on mobile, places them side-by-side on desktop).

Input Wrapper: flex-grow (Ensures the input takes up available space).

TaskFilters: flex flex-row flex-wrap justify-center sm:justify-start gap-2 (Flex wrap ensures filters don't break the layout on very small screens).

TaskList: flex flex-col gap-3 (Vertical stack of items).

TaskItem: flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all

Checkbox & Title Group: flex items-center gap-3 flex-grow min-w-0

Title Text: truncate (Prevents long tasks from breaking the flex container).

Actions Group (Status Badge + Delete Button): flex items-center gap-3 shrink-0