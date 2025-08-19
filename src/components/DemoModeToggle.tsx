import React from 'react';

interface DemoModeToggleProps {
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onResetDemo?: () => void;
}

export default function DemoModeToggle({ demoMode, onToggleDemoMode, onResetDemo }: DemoModeToggleProps) {
  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      {/* Demo Mode Toggle */}
      <button
        onClick={onToggleDemoMode}
        className={`inline-flex items-center gap-2 rounded-full border border-app px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:scale-105 ${
          demoMode 
            ? 'bg-accent text-white shadow-md' 
            : 'bg-card text-app hover:bg-accent-weak'
        }`}
        title={demoMode ? "서버 모드로 전환" : "데모 모드로 전환"}
      >
        <span className={`inline-block h-3 w-3 rounded-full ${
          demoMode ? 'bg-white' : 'bg-accent'
        }`} />
        {demoMode ? '🎮 데모 모드' : '🔗 서버 모드'}
      </button>

      {/* Demo Mode Indicator & Reset */}
      {demoMode && (
        <div className="rounded-xl bg-card border border-app p-3 shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent text-lg">🎯</span>
            <span className="text-sm font-semibold text-app">데모 모드 활성화</span>
          </div>
          <p className="text-xs text-muted mb-3">
            서버 없이 테마 시스템과 UI를 체험해보세요!
          </p>
          {onResetDemo && (
            <button
              onClick={onResetDemo}
              className="w-full px-3 py-1.5 text-xs bg-accent-weak text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-200 font-medium"
            >
              🔄 데모 데이터 초기화
            </button>
          )}
        </div>
      )}
    </div>
  );
}