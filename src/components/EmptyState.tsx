import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  query: string;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ query, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 opacity-75" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--md-sys-color-on-surface)] mb-1">
        未找到相关小工具
      </h3>
      <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] max-w-sm mb-5">
        没有找到与 “<span className="font-medium text-[var(--md-sys-color-primary)]">{query}</span>” 匹配的内容，尝试更换关键词或清除筛选条件。
      </p>
      <button
        type="button"
        onClick={onReset}
        className="md3-state-layer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] hover:opacity-90 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        <span>清除搜索与分类</span>
      </button>
    </div>
  );
};
