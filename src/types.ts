export interface MetaConfig {
  title: string;
  subtitle: string;
  description: string;
  author?: string;
  domain?: string;
  github?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  icon?: string;
}

export interface SiteItem {
  title: string;
  name?: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
  color?: string;
  badge?: string;
  tags?: string[];
}

export interface AppConfig {
  meta: MetaConfig;
  categories: CategoryConfig[];
  sites: SiteItem[];
}
