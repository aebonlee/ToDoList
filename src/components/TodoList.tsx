import React, { useState, useMemo } from 'react';
import { Todo, UpdateTodoRequest } from '../types/todo';
import { TodoItem } from './TodoItem';
import EnhancedTodoInput from './EnhancedTodoInput';
import FilterBar from './FilterBar';

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

  const { filteredTodos, completedCount, activeCount } = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const active = todos.length - completed;
    
    const filtered = todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

    return {
      filteredTodos: filtered,
      completedCount: completed,
      activeCount: active
    };
  }, [todos, filter]);

  const handleCreateTodo = async (title: string) => {
    try {
      setIsCreating(true);
      await onCreateTodo({ title });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    onDeleteTodo(id);
  };

  const handleClearCompleted = () => {
    if (window.confirm('완료된 모든 할일을 삭제하시겠습니까?')) {
      todos.filter(todo => todo.completed).forEach(todo => {
        onDeleteTodo(todo.id);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-app min-h-screen">{/* Main Container */}
      <div className="rounded-2xl bg-card border border-app shadow-xl p-6 slide-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-app mb-4 tracking-tight">
            📝 TODO 리스트
          </h1>
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="bg-accent-weak text-accent px-3 py-1 rounded-full font-medium">
              총 {todos.length}개
            </span>
            <span className="bg-warning-weak text-warning px-3 py-1 rounded-full font-medium">
              진행중 {activeCount}개
            </span>
            <span className="bg-success-weak text-success px-3 py-1 rounded-full font-medium">
              완료 {completedCount}개
            </span>
          </div>
        </div>

        {/* Enhanced Todo Input */}
        <EnhancedTodoInput onAdd={handleCreateTodo} loading={isCreating} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          remaining={activeCount}
          hasCompleted={completedCount > 0}
          onClearCompleted={handleClearCompleted}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-danger-weak border border-danger rounded-xl fade-in">
            <p className="text-danger font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent"></div>
              <span className="text-muted font-medium">로딩중...</span>
            </div>
          </div>
        )}

        {/* Todo Items */}
        {!loading && (
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16 fade-in">
                <div className="text-6xl mb-4">
                  {filter === 'all' && '📋'}
                  {filter === 'active' && '⏳'}
                  {filter === 'completed' && '🎉'}
                </div>
                <h3 className="text-xl font-semibold text-app mb-2">
                  {filter === 'all' && '할 일이 없습니다'}
                  {filter === 'active' && '진행중인 할 일이 없습니다'}
                  {filter === 'completed' && '완료된 할 일이 없습니다'}
                </h3>
                <p className="text-muted">
                  {filter === 'all' && '새로운 할 일을 추가해보세요! ✨'}
                  {filter === 'active' && '모든 할 일을 완료했습니다! 🎊'}
                  {filter === 'completed' && '완료된 할 일이 여기에 표시됩니다 📋'}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredTodos.map((todo, index) => (
                  <div key={todo.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <TodoItem
                      todo={todo}
                      onUpdate={onUpdateTodo}
                      onDelete={handleDeleteTodo}
                      onToggle={onToggleTodo}
                    />
                  </div>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};