import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  resultCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  resultCount,
  totalCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus on Ctrl+K, Meta+K, or pressing "/" when not already typing
      if (
        (e.key === 'k' && (e.ctrlKey || e.metaKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onChange('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="group relative flex items-center h-14 w-full rounded-full bg-[var(--md-sys-color-surface-container-high)] hover:bg-[var(--md-sys-color-surface-container-highest)] focus-within:bg-[var(--md-sys-color-surface-container-lowest)] focus-within:ring-2 focus-within:ring-[var(--md-sys-color-primary)] transition-all duration-200 px-4 shadow-sm">
        {/* Leading Search Icon */}
        <div className="flex items-center justify-center pl-1 pr-3 text-[var(--md-sys-color-on-surface-variant)] group-focus-within:text-[var(--md-sys-color-primary)] transition-colors">
          <Search className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索站点名称、功能描述或标签... (Ctrl + K)"
          className="w-full bg-transparent text-sm sm:text-base text-[var(--md-sys-color-on-surface)] placeholder:text-[var(--md-sys-color-on-surface-variant)]/70 focus:outline-none"
        />

        {/* Trailing actions: Clear button and keyboard shortcut indicator */}
        <div className="flex items-center gap-2 pl-2">
          {value ? (
            <button
              type="button"
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-full hover:bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface-variant)] transition-colors"
              title="清空搜索"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-[var(--md-sys-color-on-surface-variant)] bg-[var(--md-sys-color-surface-container)] rounded-md border border-[var(--md-sys-color-outline-variant)]/40">
              Ctrl K
            </kbd>
          )}

          {/* Matches Counter Badge */}
          {value && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] font-medium">
              {resultCount}/{totalCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
