import React, { useState } from 'react';
import { CreateTodoRequest } from '../types/todo';
import { PlusIcon } from '@heroicons/react/24/outline';

interface TodoFormProps {
  onSubmit: (data: CreateTodoRequest) => void;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="space-y-3">
        {/* Title Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyPress}
            placeholder="새로운 할 일을 입력하세요..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            {loading ? '추가 중...' : '추가'}
          </button>
        </div>

        {/* Description Input (appears when focused) */}
        {isExpanded && (
          <div className="space-y-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명 (선택사항)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setDescription('');
                  setIsExpanded(false);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
                disabled={loading}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};