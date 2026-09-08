import React from 'react';
import {
  Mail,
  Image,
  Hash,
  FileCode2,
  KeyRound,
  Info,
  Zap,
  Sparkles,
  Code2,
  ShieldCheck,
  Printer,
  Terminal,
  Compass,
  Globe,
  Book,
  Layers,
  Palette,
  Database,
  Server,
  FileText,
  Bookmark,
  Wrench,
  Sliders,
  Cpu,
  Box,
  Folder,
  Clock,
  Calendar,
  Music,
  Video,
  Settings,
  Hammer,
  LucideProps,
} from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name?: string;
  fallback?: string;
}

const iconRegistry: Record<string, React.ComponentType<LucideProps>> = {
  Mail,
  Image,
  Hash,
  FileCode2,
  KeyRound,
  Info,
  Zap,
  Sparkles,
  Code2,
  ShieldCheck,
  Printer,
  Terminal,
  Compass,
  Globe,
  Book,
  Layers,
  Palette,
  Database,
  Server,
  FileText,
  Bookmark,
  Wrench,
  Sliders,
  Cpu,
  Box,
  Folder,
  Clock,
  Calendar,
  Music,
  Video,
  Settings,
  Hammer,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  fallback = 'Globe',
  ...props
}) => {
  const normalizedKey = (name || '').trim();
  const IconComponent =
    iconRegistry[normalizedKey] ||
    iconRegistry[fallback] ||
    Globe;

  return <IconComponent {...props} />;
};
