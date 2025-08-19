import React, { useState } from 'react';

interface EnhancedTodoInputProps {
  onAdd: (text: string) => void;
  loading?: boolean;
}

export default function EnhancedTodoInput({ onAdd, loading = false }: EnhancedTodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || loading) return;
    onAdd(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full rounded-xl border border-app bg-card px-4 py-3 text-app placeholder:text-muted
                     focus:border-transparent focus:ring-4 ring-accent transition-all duration-200 
                     shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="새로운 할 일을 입력하세요... ✨"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="할 일 입력"
          />
          {value && (
            <button
              onClick={() => setValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-app transition-colors"
              aria-label="입력 내용 지우기"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || loading}
          className="rounded-xl bg-accent px-6 py-3 text-white font-medium 
                   hover:opacity-90 active:scale-95 transition-all duration-200 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   shadow-sm hover:shadow-md"
          aria-label="할 일 추가"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>추가 중...</span>
            </div>
          ) : (
            "추가 +"
          )}
        </button>
      </div>
    </div>
  );
}