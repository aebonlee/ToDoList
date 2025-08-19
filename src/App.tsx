import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { TodoList } from './components/TodoList';
import { HealthCheck } from './components/HealthCheck';
import ThemeProvider from './contexts/ThemeProvider';
import { useTheme } from './contexts/ThemeContext';
import PalettePicker from './components/PalettePicker';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function AppContent() {
  const { mode } = useTheme();
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
      <div className="min-h-screen flex items-center justify-center bg-app">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-app">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-app">
        {/* Theme Controls for Login Page */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <PalettePicker />
          <ThemeToggle />
        </div>
        
        <div className="max-w-md mx-auto pt-8 px-4">
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
    <div className="min-h-screen bg-app">
      {/* Enhanced Header */}
      <header className="bg-card shadow-lg border-b border-app sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-app flex items-center gap-2">
                  📝 TODO 앱
                  <span className="text-sm bg-accent text-white px-2 py-1 rounded-full font-medium">
                    {mode}
                  </span>
                </h1>
                {user && (
                  <p className="text-sm text-muted mt-1">
                    안녕하세요, <span className="font-medium text-accent">{user.name || user.email}</span>님! 🎉
                  </p>
                )}
              </div>
            </div>
            
            {/* Theme Controls & Logout */}
            <div className="flex items-center gap-3">
              <PalettePicker />
              <ThemeToggle />
              <div className="w-px h-8 bg-border"></div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-danger hover:bg-danger-weak border border-app rounded-lg transition-all duration-200 font-medium hover:scale-105 shadow-sm"
              >
                🚪 로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
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

// Main App with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
