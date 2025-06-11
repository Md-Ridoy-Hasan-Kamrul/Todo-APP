// src/hooks/useTodos.ts

import { useState, useEffect, useMemo } from 'react';
import { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(
          JSON.parse(savedTodos, (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
          })
        );
      }
    } catch (error) {
      console.error('Error loading todos from localStorage', error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage', error);
      }
    }
  }, [todos, isClient]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodoItem, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, text: string) => {
    if (text.trim() === '') return;
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const uncompletedTasksCount = useMemo(() => {
    return todos.filter((t) => !t.completed).length;
  }, [todos]);

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
