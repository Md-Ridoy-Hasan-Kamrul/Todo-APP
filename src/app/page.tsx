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

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const initialTheme = saved || 'dark';
      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        'dark',
        initialTheme === 'dark'
      );
    } catch (err) {
      console.error('Error loading theme from localStorage', err);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    } catch (err) {
      console.error('Error saving theme to localStorage', err);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleEdit = (todo: Todo) => setEditingTodo(todo);
  const cancelEdit = () => setEditingTodo(null);
  const handleUpdate = (text: string) => {
    if (!editingTodo) return;
    updateTodo(editingTodo.id, text);
    setEditingTodo(null);
  };

  return (
    <main className='bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300'>
      <div className='container mx-auto max-w-2xl px-4 py-8 md:py-12'>
        <TodoHeader
          taskCount={uncompletedTasksCount}
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
// This is the main entry point for the Todo application.
