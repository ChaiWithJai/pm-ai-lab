// Tarot Card Theme System
// Element-based styling for D&D/Tarot card UI

import { ArchetypeElement } from './challenges';

export interface ElementStyle {
  gradient: string;
  bg: string;
  border: string;
  text: string;
  glow: string;
  accent: string;
}

export const elementColors: Record<ArchetypeElement, ElementStyle> = {
  fire: {
    gradient: 'from-red-500 to-orange-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    glow: 'element-glow-fire',
    accent: 'bg-red-500',
  },
  water: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    glow: 'element-glow-water',
    accent: 'bg-blue-500',
  },
  earth: {
    gradient: 'from-green-500 to-lime-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    glow: 'element-glow-earth',
    accent: 'bg-green-500',
  },
  air: {
    gradient: 'from-yellow-400 to-amber-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    glow: 'element-glow-air',
    accent: 'bg-yellow-500',
  },
  spirit: {
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    glow: 'element-glow-spirit',
    accent: 'bg-violet-500',
  },
};

// Card size variants
export const cardSizes = {
  sm: {
    container: 'w-[200px] h-[300px]',
    symbol: 'text-5xl',
    title: 'text-sm',
    archetype: 'text-lg font-semibold',
  },
  md: {
    container: 'w-[280px] h-[400px]',
    symbol: 'text-6xl',
    title: 'text-base',
    archetype: 'text-xl font-semibold',
  },
  lg: {
    container: 'w-[320px] h-[480px]',
    symbol: 'text-7xl',
    title: 'text-lg',
    archetype: 'text-2xl font-bold',
  },
};

// Element symbols for badges
export const elementSymbols: Record<ArchetypeElement, string> = {
  fire: '🔥',
  water: '💧',
  earth: '🌍',
  air: '💨',
  spirit: '✨',
};

// Get element style with fallback
export function getElementStyle(element?: ArchetypeElement): ElementStyle {
  return element ? elementColors[element] : elementColors.spirit;
}
