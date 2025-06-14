// src/components/TodoList.tsx

import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  const isEmpty = todos.length === 0;
  const emptyMessage =
    filter === 'completed'
      ? "You haven't completed any tasks yet."
      : 'No tasks here. Add one to get started!';

  if (isEmpty) {
    return (
      <div className='text-center py-10 px-4'>
        <p className='text-gray-500 dark:text-gray-400'>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
