import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { TodoList } from './components/TodoList';
import { HealthCheck } from './components/HealthCheck';
import './App.css';

function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverHealthy, setServerHealthy] = useState<boolean>(true);
  const { 
    user, 
    loading: authLoading, 
    error: authError, 
    isAuthenticated, 
    login, 
    register, 
    logout,
    clearError 
  } = useAuth();

  const {
    todos,
    loading: todosLoading,
    error: todosError,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
    } catch (error) {
      // Error is handled by useAuth hook
    }
  };

  const handleRegister = async (userData: { email: string; password: string; name?: string }) => {
    try {
      await register(userData);
    } catch (error) {
      // Error is handled by useAuth hook
    }
  };

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await logout();
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    clearError();
  };

  // Show loading spinner during initial auth check
  if (authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <div className="max-w-md mx-auto mt-8 px-4">
          <HealthCheck onStatusChange={setServerHealthy} />
        </div>
        {isLoginMode ? (
          <LoginForm
            onSubmit={handleLogin}
            loading={authLoading}
            error={authError}
            onToggleMode={toggleAuthMode}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            loading={authLoading}
            error={authError}
            onToggleMode={toggleAuthMode}
          />
        )}
      </div>
    );
  }

  // Main app for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">TODO 앱</h1>
              {user && (
                <p className="text-sm text-gray-600">
                  안녕하세요, {user.name || user.email}님!
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <TodoList
          todos={todos}
          loading={todosLoading}
          error={todosError}
          onCreateTodo={createTodo}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
    </div>
  );
}

export default App;
