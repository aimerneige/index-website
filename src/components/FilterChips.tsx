import React from 'react';
import { Check } from 'lucide-react';
import { CategoryConfig, SiteItem } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface FilterChipsProps {
  categories: CategoryConfig[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  sites: SiteItem[];
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sites,
}) => {
  // Compute counts
  const getCount = (categoryId: string) => {
    if (categoryId === 'all') return sites.length;
    return sites.filter((s) => s.category === categoryId).length;
  };

  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar px-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = getCount(cat.id);

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`md3-state-layer inline-flex items-center gap-2 h-8 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 ${
              isSelected
                ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] font-semibold shadow-xs'
                : 'border border-[var(--md-sys-color-outline-variant)] text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-on-surface)]'
            }`}
          >
            {/* Leading Icon or Checkmark */}
            {isSelected ? (
              <Check className="w-3.5 h-3.5 text-[var(--md-sys-color-on-secondary-container)] stroke-[2.5]" />
            ) : cat.icon ? (
              <DynamicIcon name={cat.icon} className="w-3.5 h-3.5 opacity-80" />
            ) : null}

            <span>{cat.name}</span>

            {/* Category count pill */}
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                isSelected
                  ? 'bg-[var(--md-sys-color-on-secondary-container)]/15 text-[var(--md-sys-color-on-secondary-container)]'
                  : 'bg-[var(--md-sys-color-surface-container-highest)] text-[var(--md-sys-color-on-surface-variant)]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
