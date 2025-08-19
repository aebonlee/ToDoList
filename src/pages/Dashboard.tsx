import React from 'react';
import { TodoList } from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';
import { useDemoTodos } from '../hooks/useDemoTodos';

interface DashboardProps {
  demoMode: boolean;
}

export default function Dashboard({ demoMode }: DashboardProps) {
  const {
    todos: serverTodos,
    loading: serverTodosLoading,
    error: serverTodosError,
    createTodo: serverCreateTodo,
    updateTodo: serverUpdateTodo,
    deleteTodo: serverDeleteTodo,
    toggleTodo: serverToggleTodo,
  } = useTodos();

  const {
    todos: demoTodos,
    loading: demoTodosLoading,
    error: demoTodosError,
    createTodo: demoCreateTodo,
    updateTodo: demoUpdateTodo,
    deleteTodo: demoDeleteTodo,
    toggleTodo: demoToggleTodo,
  } = useDemoTodos();

  // 현재 모드에 따라 사용할 데이터와 함수들 선택
  const todos = demoMode ? demoTodos : serverTodos;
  const todosLoading = demoMode ? demoTodosLoading : serverTodosLoading;
  const todosError = demoMode ? demoTodosError : serverTodosError;
  const createTodo = demoMode ? demoCreateTodo : serverCreateTodo;
  const updateTodo = demoMode ? demoUpdateTodo : serverUpdateTodo;
  const deleteTodo = demoMode ? demoDeleteTodo : serverDeleteTodo;
  const toggleTodo = demoMode ? demoToggleTodo : serverToggleTodo;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app mb-2">📊 대시보드</h1>
        <p className="text-muted">
          할일을 효율적으로 관리하고 진행상황을 확인하세요.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 border border-app shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-weak">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted">총 할일</p>
              <p className="text-2xl font-bold text-app">{todos.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-app shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-weak">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted">진행 중</p>
              <p className="text-2xl font-bold text-app">
                {todos.filter(todo => !todo.completed).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-app shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-weak">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted">완료됨</p>
              <p className="text-2xl font-bold text-app">
                {todos.filter(todo => todo.completed).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main TodoList */}
      <div className="bg-card rounded-xl border border-app shadow-sm">
        <div className="p-6 border-b border-app">
          <h2 className="text-xl font-semibold text-app">📋 할일 목록</h2>
          <p className="text-sm text-muted mt-1">
            새로운 할일을 추가하고 진행상황을 관리하세요.
          </p>
        </div>
        
        <div className="p-0">
          <TodoList
            todos={todos}
            loading={todosLoading}
            error={todosError}
            onCreateTodo={createTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
          />
        </div>
      </div>
    </div>
  );
}