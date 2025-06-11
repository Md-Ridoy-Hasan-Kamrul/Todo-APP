// src/components/TodoHeader.tsx
'use client';

import { GiMoonBats, GiSun } from 'react-icons/gi';

interface TodoHeaderProps {
  taskCount: number;
  theme: string; // Accepts 'light' or 'dark'
  toggleTheme: () => void;
}

const getGreeting = () => {
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
  return (
    <header className='flex justify-between items-center mb-8'>
      <div>
        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {getGreeting()}
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>
          You have {taskCount} tasks left.
        </p>
      </div>
      <button
        onClick={toggleTheme} // Use the passed-in toggle function
        className='p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900'
      >
        {theme === 'dark' ? <GiSun size={22} /> : <GiMoonBats size={22} />}
      </button>
    </header>
  );
}
