'use client';

import { Difficulty } from '@/data/action-guides';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const styles = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  };

  const labels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Advanced',
  };

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}
