'use client';

import { categoryMeta, ChallengeCategory, challenges } from '@/data/challenges';

interface CategoryFilterProps {
  selectedCategory: ChallengeCategory | 'all';
  onCategoryChange: (category: ChallengeCategory | 'all') => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  // Get counts per category
  const counts: Record<string, number> = { all: challenges.length };
  challenges.forEach((c) => {
    counts[c.category] = (counts[c.category] || 0) + 1;
  });

  const categories = Object.entries(categoryMeta) as [
    ChallengeCategory,
    (typeof categoryMeta)[ChallengeCategory],
  ][];

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-gray-600">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
        >
          All ({counts.all})
        </button>
        {categories.map(([key, meta]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`category-pill ${selectedCategory === key ? 'active' : ''}`}
          >
            <span>{meta.icon}</span>
            <span className="hidden sm:inline">{meta.label}</span>
            <span className="text-xs opacity-70">({counts[key] || 0})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
