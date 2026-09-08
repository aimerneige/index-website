import { useState, useEffect, useMemo } from 'react';
import { load as yamlLoad } from 'js-yaml';
import sitesYamlRaw from '../sites.yaml?raw';
import { AppConfig, SiteItem } from './types';
import { TopAppBar } from './components/TopAppBar';
import { SearchBar } from './components/SearchBar';
import { FilterChips } from './components/FilterChips';
import { SiteCard } from './components/SiteCard';
import { EmptyState } from './components/EmptyState';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  // Theme state: dark / light
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Load config from bundled sites.yaml initially
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const parsed = yamlLoad(sitesYamlRaw) as AppConfig;
      return parsed;
    } catch (err) {
      console.error('Failed to parse bundled sites.yaml:', err);
      return {
        meta: {
          title: "Aimer's Hub",
          subtitle: "个人小工具导航",
          description: "实用小工具静态导航页",
          domain: "www.aimer.moe",
        },
        categories: [{ id: 'all', name: '全部' }],
        sites: [],
      };
    }
  });

  // Also optionally check if runtime ./sites.yaml exists and update gracefully
  useEffect(() => {
    fetch('./sites.yaml')
      .then((res) => {
        if (res.ok) return res.text();
        return null;
      })
      .then((text) => {
        if (text) {
          const parsed = yamlLoad(text) as AppConfig;
          if (parsed && parsed.sites) {
            setConfig(parsed);
          }
        }
      })
      .catch(() => {
        // Silently use bundled YAML
      });
  }, []);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle copy URL with toast feedback
  const handleCopyUrl = (url: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedUrl(url);
        setToastMessage(`已复制链接: ${url}`);
        setTimeout(() => {
          setCopiedUrl(null);
          setToastMessage(null);
        }, 2200);
      });
    }
  };

  // Filter sites based on search and category
  const filteredSites = useMemo(() => {
    return config.sites.filter((site: SiteItem) => {
      // Category filter
      if (selectedCategory !== 'all' && site.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = site.title?.toLowerCase().includes(q);
      const matchName = site.name?.toLowerCase().includes(q);
      const matchDesc = site.description?.toLowerCase().includes(q);
      const matchUrl = site.url?.toLowerCase().includes(q);
      const matchTags = site.tags?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchName || matchDesc || matchUrl || matchTags;
    });
  }, [config.sites, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors duration-200">
      {/* MD3 Top App Bar */}
      <TopAppBar
        meta={config.meta}
        totalSites={config.sites.length}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] mb-4">
            <span>Material Design 3</span>
            <span className="w-1 h-1 rounded-full bg-[var(--md-sys-color-on-primary-container)] opacity-60" />
            <span>静态小工具导航</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--md-sys-color-on-surface)] mb-3">
            {config.meta.subtitle || '极简、纯粹、即开即用的工具箱'}
          </h2>

          <p className="text-sm sm:text-base text-[var(--md-sys-color-on-surface-variant)] max-w-2xl mx-auto mb-8">
            {config.meta.description || '无服务端依赖，快速触达每个静态小工具'}
          </p>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={filteredSites.length}
              totalCount={config.sites.length}
            />
          </div>

          {/* Category Filter Chips */}
          <FilterChips
            categories={config.categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sites={config.sites}
          />
        </section>

        {/* Sites Grid */}
        {filteredSites.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.url}
                site={site}
                onCopyUrl={handleCopyUrl}
                isCopied={copiedUrl === site.url}
              />
            ))}
          </section>
        ) : (
          <EmptyState
            query={searchQuery}
            onReset={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer meta={config.meta} />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
