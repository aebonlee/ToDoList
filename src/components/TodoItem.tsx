import React, { useState } from 'react';
import { Todo, UpdateTodoRequest } from '../types/todo';
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: UpdateTodoRequest) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
  onToggle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm transition-all duration-200 ${
      todo.completed 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-300 hover:border-blue-300'
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          {todo.completed && <CheckIcon className="w-3 h-3" />}
        </button>

        {/* Content */}
        <div className="flex-grow min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="할 일 제목"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="설명 (선택사항)"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <h3 className={`font-medium text-gray-900 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm text-gray-600 mt-1 ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}>
                  {todo.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                title="저장"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded"
                title="취소"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                title="편집"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                title="삭제"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};