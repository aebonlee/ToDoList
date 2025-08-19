import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      onClick={toggleMode}
      className="inline-flex items-center gap-2 rounded-full border border-app bg-card px-3 py-2 text-sm hover:bg-accent-weak transition-all duration-200 shadow-sm"
      title="라이트/다크 모드 전환"
      aria-label={`현재 ${mode} 모드, 클릭하여 ${isDark ? 'light' : 'dark'} 모드로 변경`}
    >
      <span 
        className={`inline-block h-3 w-3 rounded-full transition-colors duration-200 ${
          isDark ? "bg-yellow-400" : "bg-slate-800"
        }`}
      />
      <span className="font-medium text-app">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}