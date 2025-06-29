'use client';

import { GiMoonBats, GiSun } from 'react-icons/gi';

interface TodoHeaderProps {
  taskCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export default function TodoHeader({
  taskCount,
  theme,
  toggleTheme,
}: TodoHeaderProps) {
  const greeting = getGreeting();

  return (
    <header className='flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-8'>
      <div>
        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {greeting}
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>
          You have {taskCount} task{taskCount !== 1 && 's'} left.
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className='p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900'
        aria-label='Toggle theme'
      >
        {theme === 'dark' ? <GiSun size={22} /> : <GiMoonBats size={22} />}
      </button>
    </header>
  );
}
