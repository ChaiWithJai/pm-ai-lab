'use client';

import { Challenge, archetypeMeta } from '@/data/challenges';
import { cardSizes, getElementStyle } from '@/data/tarot-theme';
import { TarotIllustrations } from './svg/TarotIllustrations';

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

  // Get the SVG illustration component for this archetype
  const IllustrationComponent = archetype?.name ? TarotIllustrations[archetype.name] : null;

  // Difficulty badge colors
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className={`tarot-card-face flex flex-col overflow-hidden rounded-xl bg-[#fdf6e3]`}>
      {/* Full SVG Illustration */}
      {IllustrationComponent ? (
        <div className="flex flex-1 flex-col">
          {/* SVG takes most of the space */}
          <div className="relative flex-1 overflow-hidden">
            <IllustrationComponent />
          </div>
          {/* Clean footer bar - not an overlay */}
          <div className="border-t border-[#d4af37]/30 bg-[#fdf6e3] px-3 py-2">
            <p className={`${sizeStyles.title} line-clamp-1 font-serif font-medium text-[#2c3e50]`}>
              {challenge.title}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${difficultyColors[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
              <span className="text-xs font-semibold text-red-600">
                {challenge.aiFailureRate}% fail
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback for cards without SVG illustrations */
        <>
          {/* Header with element indicator */}
          <div
            className={`flex items-center justify-between border-b px-3 py-2 ${elementStyle.bg} ${elementStyle.border}`}
          >
            <span className={`text-xs font-semibold tracking-wide uppercase ${elementStyle.text}`}>
              {archetype?.element || 'Unknown'}
            </span>
            {meta?.tarotNumber !== undefined && (
              <span className={`text-sm font-bold ${elementStyle.text}`}>#{meta.tarotNumber}</span>
            )}
          </div>

          {/* Symbol fallback */}
          <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <span className={`${sizeStyles.symbol} opacity-50`}>{archetype?.symbol || '?'}</span>
          </div>

          {/* Archetype Name */}
          <div className="border-t bg-white px-3 py-2 text-center">
            <h3 className={`${sizeStyles.archetype} font-serif ${elementStyle.text}`}>
              {archetype?.name || 'Unknown'}
            </h3>
          </div>

          {/* Challenge Title */}
          <div className="border-t bg-gray-50 px-3 py-2">
            <p className={`${sizeStyles.title} line-clamp-2 text-center font-medium text-gray-700`}>
              {challenge.title}
            </p>
          </div>

          {/* Footer: Difficulty + Failure Rate */}
          <div className="flex items-center justify-between border-t bg-white px-3 py-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${difficultyColors[challenge.difficulty]}`}
            >
              {challenge.difficulty}
            </span>
            <span className="text-xs font-semibold text-red-600">
              {challenge.aiFailureRate}% fail
            </span>
          </div>
        </>
      )}
    </div>
  );
}
