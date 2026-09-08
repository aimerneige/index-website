import React from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { SiteItem } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface SiteCardProps {
  site: SiteItem;
  onCopyUrl: (url: string) => void;
  isCopied: boolean;
}

// MD3 Tonal Color classes mapping for site icon container
const colorThemeMap: Record<string, { bg: string; text: string; ring: string }> = {
  sky: {
    bg: 'bg-sky-500/12 dark:bg-sky-400/15',
    text: 'text-sky-700 dark:text-sky-300',
    ring: 'group-hover:ring-sky-500/30',
  },
  violet: {
    bg: 'bg-violet-500/12 dark:bg-violet-400/15',
    text: 'text-violet-700 dark:text-violet-300',
    ring: 'group-hover:ring-violet-500/30',
  },
  blue: {
    bg: 'bg-blue-500/12 dark:bg-blue-400/15',
    text: 'text-blue-700 dark:text-blue-300',
    ring: 'group-hover:ring-blue-500/30',
  },
  amber: {
    bg: 'bg-amber-500/12 dark:bg-amber-400/15',
    text: 'text-amber-800 dark:text-amber-300',
    ring: 'group-hover:ring-amber-500/30',
  },
  emerald: {
    bg: 'bg-emerald-500/12 dark:bg-emerald-400/15',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'group-hover:ring-emerald-500/30',
  },
  teal: {
    bg: 'bg-teal-500/12 dark:bg-teal-400/15',
    text: 'text-teal-700 dark:text-teal-300',
    ring: 'group-hover:ring-teal-500/30',
  },
  rose: {
    bg: 'bg-rose-500/12 dark:bg-rose-400/15',
    text: 'text-rose-700 dark:text-rose-300',
    ring: 'group-hover:ring-rose-500/30',
  },
  indigo: {
    bg: 'bg-indigo-500/12 dark:bg-indigo-400/15',
    text: 'text-indigo-700 dark:text-indigo-300',
    ring: 'group-hover:ring-indigo-500/30',
  },
};

export const SiteCard: React.FC<SiteCardProps> = ({ site, onCopyUrl, isCopied }) => {
  const theme = (site.color && colorThemeMap[site.color]) || colorThemeMap.blue;

  // Extract clean domain / hostname display
  let cleanDomain = site.url;
  try {
    const parsed = new URL(site.url);
    cleanDomain = parsed.hostname;
  } catch {
    // fallback
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[var(--md-sys-color-surface-container-low)] hover:bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline-variant)]/50 hover:border-[var(--md-sys-color-outline-variant)] p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* Icon Avatar */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ring-2 ring-transparent ${theme.ring} ${theme.bg} ${theme.text}`}
            >
              <DynamicIcon name={site.icon} className="w-6 h-6" />
            </div>

            {/* Title & Domain */}
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-semibold text-[var(--md-sys-color-on-surface)] group-hover:text-[var(--md-sys-color-primary)] transition-colors inline-flex items-center gap-1"
                >
                  {site.title}
                </a>
              </div>
              <div className="text-xs font-mono text-[var(--md-sys-color-on-surface-variant)]/80">
                {cleanDomain}
              </div>
            </div>
          </div>

          {/* Optional Badge */}
          {site.badge && (
            <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] border border-[var(--md-sys-color-primary)]/10">
              {site.badge}
            </span>
          )}
        </div>

        {/* Subtitle / Name if different from title */}
        {site.name && site.name !== site.title && (
          <div className="text-xs font-medium text-[var(--md-sys-color-primary)] mb-1.5">
            {site.name}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] line-clamp-2 leading-relaxed mb-4 min-h-[2.6rem]">
          {site.description}
        </p>

        {/* Tags */}
        {site.tags && site.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {site.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-highest)] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions Bottom Row */}
      <div className="pt-3 border-t border-[var(--md-sys-color-outline-variant)]/30 flex items-center justify-between gap-2 mt-auto">
        <button
          type="button"
          onClick={() => onCopyUrl(site.url)}
          className="md3-state-layer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors"
          title="复制链接"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制链接</span>
            </>
          )}
        </button>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="md3-state-layer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] hover:opacity-95 shadow-xs transition-transform active:scale-95"
        >
          <span>立即前往</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
