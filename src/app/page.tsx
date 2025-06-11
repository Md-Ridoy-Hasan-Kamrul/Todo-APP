// src/app/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import TodoFilter from './components/TodoFilter';
import TodoForm from './components/TodoForm';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types';

export default function Home() {
  const {
    todos,
    uncompletedTasksCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  } = useTodos();
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // This state will now ONLY hold the string 'light' or 'dark'
  const [theme, setTheme] = useState('dark');

  // This effect runs ONCE on component mount to set the initial theme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      // Directly apply the class on initial load
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error loading theme from localStorage', error);
    }
  }, []); // Empty dependency array means this runs only once on mount

  // This function handles the toggle logic
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
      // Directly apply the class when toggling
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error saving theme to localStorage', error);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleEdit = (todo: Todo) => setEditingTodo(todo);
  const cancelEdit = () => setEditingTodo(null);
  const handleUpdate = (text: string) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, text);
      setEditingTodo(null);
    }
  };

  return (
    <main className='bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300'>
      <div className='container mx-auto max-w-2xl px-4 py-8 md:py-12'>
        <TodoHeader
          taskCount={uncompletedTasksCount}
          // Pass the current theme and the toggle function to the header
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <TodoForm
          onAddTodo={addTodo}
          onUpdateTodo={handleUpdate}
          editingTodo={editingTodo}
          onCancelEdit={cancelEdit}
        />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
