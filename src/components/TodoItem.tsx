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
    <li className={`slide-in border border-app rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
      todo.completed 
        ? 'bg-card opacity-70' 
        : 'bg-card hover:scale-[1.01]'
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            todo.completed
              ? 'bg-accent border-accent text-white shadow-md'
              : 'border-app hover:border-accent hover:bg-accent-weak'
          }`}
          aria-label={todo.completed ? '완료 취소' : '완료 처리'}
        >
          {todo.completed && <CheckIcon className="w-4 h-4" />}
        </button>

        {/* Content */}
        <div className="flex-grow min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-transparent focus:ring-4 ring-accent transition-all duration-200"
                placeholder="할 일 제목"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-transparent focus:ring-4 ring-accent resize-none transition-all duration-200"
                placeholder="설명 (선택사항)"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <h3 className={`font-semibold text-app transition-all duration-200 ${
                todo.completed ? 'line-through text-muted' : ''
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm text-muted mt-1 transition-all duration-200 ${
                  todo.completed ? 'line-through opacity-60' : ''
                }`}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-muted bg-accent-weak px-2 py-1 rounded-full">
                  📅 {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
                </span>
                {todo.completed && (
                  <span className="text-xs text-success bg-success-weak px-2 py-1 rounded-full">
                    ✅ 완료됨
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-success hover:bg-success-weak rounded-lg transition-all duration-200 hover:scale-110 shadow-sm"
                title="저장"
                aria-label="변경사항 저장"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-muted hover:bg-accent-weak rounded-lg transition-all duration-200 hover:scale-110 shadow-sm"
                title="취소"
                aria-label="편집 취소"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-accent hover:bg-accent-weak rounded-lg transition-all duration-200 hover:scale-110 shadow-sm"
                title="편집"
                aria-label="할일 편집"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('정말로 삭제하시겠습니까?')) {
                    onDelete(todo.id);
                  }
                }}
                className="p-2 text-danger hover:bg-danger-weak rounded-lg transition-all duration-200 hover:scale-110 shadow-sm"
                title="삭제"
                aria-label="할일 삭제"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};