import React from 'react';
import { MetaConfig } from '../types';
import { Globe, Heart } from 'lucide-react';

interface FooterProps {
  meta: MetaConfig;
}

export const Footer: React.FC<FooterProps> = ({ meta }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--md-sys-color-outline-variant)]/30 bg-[var(--md-sys-color-surface-container-lowest)]/50 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--md-sys-color-on-surface-variant)]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[var(--md-sys-color-primary)]" />
          <span>{meta.domain || 'www.aimer.moe'}</span>
          <span>·</span>
          <span>遵循 Material Design 3 规范</span>
        </div>

        <div className="flex items-center gap-1.5 text-center">
          <span>Designed with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for {meta.author || "Aimer"}'s Tools © {currentYear}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--md-sys-color-surface-container-high)]">
            纯静态 · GitHub Pages
          </span>
        </div>
      </div>
    </footer>
  );
};
