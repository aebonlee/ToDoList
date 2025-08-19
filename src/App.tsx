import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDemoTodos } from './hooks/useDemoTodos';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { HealthCheck } from './components/HealthCheck';
import DemoModeToggle from './components/DemoModeToggle';
import Navigation from './components/Navigation';
import ThemeProvider from './contexts/ThemeProvider';
import { useTheme } from './contexts/ThemeContext';
import PalettePicker from './components/PalettePicker';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import './App.css';

function AppContent() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
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

  const { resetDemoData } = useDemoTodos();

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

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    clearError();
  };

  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
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

  // 데모 모드이거나 인증된 경우 메인 앱 표시
  if (demoMode || isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-app">
          {/* Demo Mode Toggle */}
          <DemoModeToggle 
            demoMode={demoMode} 
            onToggleDemoMode={toggleDemoMode}
            onResetDemo={demoMode ? resetDemoData : undefined}
          />

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Dashboard demoMode={demoMode} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  // Show auth forms if not authenticated and not in demo mode
  return (
    <div className="min-h-screen bg-app">
      {/* Demo Mode Toggle for Login Page */}
      <DemoModeToggle 
        demoMode={demoMode} 
        onToggleDemoMode={toggleDemoMode}
      />

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

// Main App with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
