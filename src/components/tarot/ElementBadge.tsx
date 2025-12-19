'use client';

import { ArchetypeElement } from '@/data/challenges';
import { elementColors, elementSymbols } from '@/data/tarot-theme';

interface ElementBadgeProps {
  element: ArchetypeElement;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function ElementBadge({
  element,
  size = 'sm',
  showLabel = false,
}: ElementBadgeProps) {
  const style = elementColors[element];
  const symbol = elementSymbols[element];

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.border} border ${style.text} ${sizeClasses} font-medium`}
    >
      <span>{symbol}</span>
      {showLabel && <span className="capitalize">{element}</span>}
    </span>
  );
}
