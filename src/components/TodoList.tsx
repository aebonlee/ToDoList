import React, { useState } from 'react';
import { Todo, UpdateTodoRequest } from '../types/todo';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onCreateTodo: (data: { title: string; description?: string }) => void;
  onUpdateTodo: (id: string, data: UpdateTodoRequest) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleTodo,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [isCreating, setIsCreating] = useState(false);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const handleCreateTodo = async (data: { title: string; description?: string }) => {
    try {
      setIsCreating(true);
      await onCreateTodo(data);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('이 할 일을 삭제하시겠습니까?')) {
      onDeleteTodo(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">할 일 목록</h1>
        <p className="text-gray-600">
          총 {todos.length}개 할 일 중 {completedCount}개 완료, {activeCount}개 진행 중
        </p>
      </div>

      {/* Add Todo Form */}
      <div className="mb-6">
        <TodoForm onSubmit={handleCreateTodo} loading={isCreating} />
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'all', label: '전체', count: todos.length },
            { key: 'active', label: '진행 중', count: activeCount },
            { key: 'completed', label: '완료', count: completedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Todo Items */}
      {!loading && (
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                {filter === 'all' && '할 일이 없습니다.'}
                {filter === 'active' && '진행 중인 할 일이 없습니다.'}
                {filter === 'completed' && '완료된 할 일이 없습니다.'}
              </div>
              <p className="text-gray-500 text-sm">
                {filter === 'all' && '새로운 할 일을 추가해보세요!'}
                {filter === 'active' && '모든 할 일을 완료했습니다!'}
                {filter === 'completed' && '완료된 할 일이 여기에 표시됩니다.'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdateTodo}
                onDelete={handleDeleteTodo}
                onToggle={onToggleTodo}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};