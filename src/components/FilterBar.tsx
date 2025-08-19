import React from 'react';

interface FilterBarProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  remaining: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export default function FilterBar({ 
  filter, 
  setFilter, 
  remaining, 
  hasCompleted, 
  onClearCompleted 
}: FilterBarProps) {
  const Tab = ({ value, label }: { value: "all" | "active" | "completed"; label: string }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-2 text-sm rounded-lg border border-app bg-card hover:bg-accent-weak 
                 transition-all duration-200 font-medium ${
        filter === value 
          ? "ring-2 ring-accent bg-accent-weak text-accent shadow-sm" 
          : "text-app hover:scale-105"
      }`}
      aria-selected={filter === value}
      role="tab"
    >
      {label}
    </button>
  );

  return (
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">
          📝 남은 할일: 
          <span className="font-bold text-accent ml-1">{remaining}개</span>
        </span>
      </div>
      
      <div className="flex items-center gap-2 sm:ml-auto">
        <div className="inline-flex items-center gap-1 rounded-lg border border-app bg-card p-1 shadow-sm" 
             role="tablist" 
             aria-label="할일 필터">
          <Tab value="all" label="전체" />
          <Tab value="active" label="미완료" />
          <Tab value="completed" label="완료" />
        </div>
        
        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 text-sm rounded-lg border border-app bg-card hover:bg-danger-weak 
                     hover:text-danger transition-all duration-200 font-medium shadow-sm hover:scale-105"
          >
            🗑️ 완료 비우기
          </button>
        )}
      </div>
    </div>
  );
}