'use client';

import { Challenge, archetypeMeta } from '@/data/challenges';
import { cardSizes, getElementStyle } from '@/data/tarot-theme';
import ElementBadge from './ElementBadge';

interface TarotCardFrontProps {
  challenge: Challenge;
  size: 'sm' | 'md' | 'lg';
}

export default function TarotCardFront({ challenge, size }: TarotCardFrontProps) {
  const archetype = challenge.archetype;
  const sizeStyles = cardSizes[size];
  const elementStyle = getElementStyle(archetype?.element);

  // Get archetype metadata for tarot number
  const archetypeKey = archetype?.name.toLowerCase().replace(/\s+/g, '-');
  const meta = archetypeKey ? archetypeMeta[archetypeKey] : undefined;

  // Difficulty badge colors
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div
      className={`tarot-card-face flex flex-col ${elementStyle.bg} ${elementStyle.border} border-2`}
    >
      {/* Header: Element + Tarot Number */}
      <div className="flex items-center justify-between px-4 pt-4">
        {archetype?.element && <ElementBadge element={archetype.element} size="sm" />}
        {meta?.tarotNumber !== undefined && (
          <span className={`${sizeStyles.title} font-bold ${elementStyle.text} opacity-60`}>
            #{meta.tarotNumber}
          </span>
        )}
      </div>

      {/* Symbol */}
      <div className="flex flex-1 items-center justify-center">
        <span className={`${sizeStyles.symbol}`}>{archetype?.symbol || '?'}</span>
      </div>

      {/* Archetype Name */}
      <div className="px-4 text-center">
        <h3 className={`${sizeStyles.archetype} ${elementStyle.text}`}>
          {archetype?.name || 'Unknown'}
        </h3>
      </div>

      {/* Divider */}
      <div className={`mx-4 my-2 h-px bg-gradient-to-r ${elementStyle.gradient} opacity-30`} />

      {/* Challenge Title */}
      <div className="px-4 pb-2 text-center">
        <p className={`${sizeStyles.title} line-clamp-2 font-medium text-gray-700`}>
          {challenge.title}
        </p>
      </div>

      {/* Footer: Difficulty + Failure Rate */}
      <div className="flex items-center justify-between px-4 pb-4">
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${difficultyColors[challenge.difficulty]}`}
        >
          {challenge.difficulty}
        </span>
        <span className="text-xs font-semibold text-red-600">{challenge.aiFailureRate}% fail</span>
      </div>
    </div>
  );
}
