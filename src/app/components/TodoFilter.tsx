// src/components/TodoFilter.tsx

interface TodoFilterProps {
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const FILTER_OPTIONS: Array<{
  label: string;
  value: 'all' | 'active' | 'completed';
}> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilter({
  currentFilter,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div className='flex flex-wrap justify-center items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md w-fit mx-auto max-w-full'>
      {FILTER_OPTIONS.map(({ label, value }) => {
        const isActive = currentFilter === value;
        return (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
