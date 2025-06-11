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
  if (todos.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='text-gray-500 dark:text-gray-400'>
          {filter === 'completed'
            ? "You haven't completed any tasks yet."
            : 'No tasks here. Add one to get started!'}
        </p>
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
