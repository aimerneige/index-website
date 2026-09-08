import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { MetaConfig } from '../types';

interface TopAppBarProps {
  meta: MetaConfig;
  totalSites: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  meta,
  totalSites,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[var(--md-sys-color-surface)]/85 border-b border-[var(--md-sys-color-outline-variant)]/40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand & Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]">
                {meta.title}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                {totalSites} 个工具
              </span>
            </div>
            <p className="text-xs text-[var(--md-sys-color-on-surface-variant)] line-clamp-1">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* GitHub link if configured */}
          {meta.github && (
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="md3-state-layer inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors"
              title="查看 GitHub 仓库"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="md3-state-layer inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors"
            title={isDark ? '切换至明亮模式' : '切换至暗色模式'}
            aria-label="切换主题"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-sky-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
