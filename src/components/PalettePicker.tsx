import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const PALETTES = [
  { key: "blue", label: "Blue", dot: "bg-blue-500" },
  { key: "green", label: "Green", dot: "bg-emerald-500" },
  { key: "purple", label: "Purple", dot: "bg-violet-500" },
  { key: "pink", label: "Pink", dot: "bg-pink-500" },
  { key: "orange", label: "Orange", dot: "bg-amber-500" },
] as const;

export default function PalettePicker() {
  const { palette, setPalette } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-app bg-card p-1 shadow-sm">
      {PALETTES.map((p) => (
        <button
          key={p.key}
          onClick={() => setPalette(p.key)}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all duration-200 hover:bg-accent-weak ${
            palette === p.key 
              ? "ring-2 ring-accent bg-accent-weak" 
              : "hover:scale-105"
          }`}
          title={`${p.label} 테마로 변경`}
          aria-label={`${p.label} 컬러 팔레트`}
          aria-pressed={palette === p.key}
        >
          <span className={`h-3 w-3 rounded-full ${p.dot} shadow-sm`} />
          <span className="font-medium text-app hidden sm:inline">
            {p.label}
          </span>
        </button>
      ))}
    </div>
  );
}