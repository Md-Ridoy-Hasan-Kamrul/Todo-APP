// src/hooks/useTodos.ts

import { useState, useEffect, useMemo } from 'react';
import { Todo } from '../types';

const TODOS_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);

    try {
      const saved = localStorage.getItem(TODOS_KEY);
      if (saved) {
        const parsed: Todo[] = JSON.parse(saved, (key, value) =>
          key === 'createdAt' ? new Date(value) : value
        );
        setTodos(parsed);
      }
    } catch (err) {
      console.error('Error loading todos from localStorage', err);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isClient) return;

    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error('Error saving todos to localStorage', err);
    }
  }, [todos, isClient]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );
  };

  const uncompletedTasksCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  return {
    todos,
    uncompletedTasksCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setTodos,
  };
}
