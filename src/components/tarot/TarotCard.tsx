'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { Challenge } from '@/data/challenges';
import { cardSizes, getElementStyle } from '@/data/tarot-theme';
import TarotCardFront from './TarotCardFront';
import TarotCardBack from './TarotCardBack';

export interface TarotCardProps {
  challenge: Challenge;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  initialFlipped?: boolean;
  onFlip?: (isFlipped: boolean) => void;
}

export default function TarotCard({
  challenge,
  size = 'md',
  interactive = true,
  initialFlipped = false,
  onFlip,
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);

  const sizeStyles = cardSizes[size];
  const elementStyle = getElementStyle(challenge.archetype?.element);

  const handleFlip = useCallback(() => {
    if (!interactive) return;

    setIsFlipped((prev) => {
      const newState = !prev;
      onFlip?.(newState);
      return newState;
    });
  }, [interactive, onFlip]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFlip();
      }
    },
    [handleFlip]
  );

  return (
    <div className={`tarot-card-container ${sizeStyles.container}`}>
      <div
        className={`tarot-card ${sizeStyles.container} ${isFlipped ? 'flipped' : ''} ${elementStyle.glow} rounded-2xl`}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : -1}
        role={interactive ? 'button' : undefined}
        aria-pressed={interactive ? isFlipped : undefined}
        aria-label={
          interactive
            ? `${challenge.archetype?.name || challenge.title} tarot card. ${isFlipped ? 'Showing back. Press to flip to front.' : 'Showing front. Press to flip to back.'}`
            : `${challenge.archetype?.name || challenge.title} tarot card`
        }
      >
        {/* Front Face */}
        <TarotCardFront challenge={challenge} size={size} />

        {/* Back Face */}
        <TarotCardBack challenge={challenge} size={size} />
      </div>
    </div>
  );
}
