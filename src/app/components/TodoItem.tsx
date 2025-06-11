// src/components/TodoItem.tsx
import { BsTrash2 } from 'react-icons/bs';
import { GoCheckCircle } from 'react-icons/go';
import { MdOutlineCircle } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg animate-fade-in'>
      <div className='flex items-center gap-4'>
        <button onClick={() => onToggle(todo.id)} className='flex-shrink-0'>
          {todo.completed ? (
            <GoCheckCircle size={24} className='text-green-500' />
          ) : (
            <MdOutlineCircle
              size={24}
              className='text-gray-300 dark:text-gray-600'
            />
          )}
        </button>
        <span
          className={`text-lg break-all ${
            todo.completed
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-800 dark:text-gray-200'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => onEdit(todo)}
          className='p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className='p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          <BsTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}
