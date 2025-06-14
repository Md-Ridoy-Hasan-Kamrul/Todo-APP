// src/components/TodoForm.tsx

import { useState, useEffect, FormEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { Todo } from '../types';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
  onUpdateTodo: (text: string) => void;
  editingTodo: Todo | null;
  onCancelEdit: () => void;
}

export default function TodoForm({
  onAddTodo,
  onUpdateTodo,
  editingTodo,
  onCancelEdit,
}: TodoFormProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(editingTodo?.text ?? '');
  }, [editingTodo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) return;

    if (editingTodo) {
      onUpdateTodo(trimmedText);
    } else {
      onAddTodo(trimmedText);
    }
    setText('');
  };

  const handleCancelEdit = () => {
    onCancelEdit();
    setText('');
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-wrap sm:flex-nowrap items-center gap-4'
      >
        <FiPlus className='text-gray-400' size={24} />

        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a new task...'
          className='flex-grow bg-transparent border-none focus:ring-0 text-lg px-2 py-1 placeholder-gray-400 dark:placeholder-gray-500'
        />

        {editingTodo && (
          <button
            type='button'
            onClick={handleCancelEdit}
            className='p-2 text-gray-400 hover:text-red-500'
          >
            <IoCloseOutline size={20} />
          </button>
        )}

        <button
          type='submit'
          disabled={!text.trim()}
          className='bg-blue-600 text-white rounded-lg px-5 py-2 font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:bg-gray-400'
        >
          {editingTodo ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}
