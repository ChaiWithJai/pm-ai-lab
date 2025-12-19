'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { challenges, ChallengeCategory } from '@/data/challenges';
import ChallengeCard from './ChallengeCard';
import CategoryFilter from './CategoryFilter';

type SortOption = 'failure-rate' | 'bookmarks' | 'shares' | 'difficulty';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

export default function ChallengeDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('failure-rate');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredChallenges = useMemo(() => {
    let filtered = challenges;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((c) => c.difficulty === difficultyFilter);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'failure-rate':
          return b.aiFailureRate - a.aiFailureRate;
        case 'bookmarks':
          return (b.bookmarkCount || 0) - (a.bookmarkCount || 0);
        case 'shares':
          return (b.shareCount || 0) - (a.shareCount || 0);
        case 'difficulty':
          const order = { beginner: 1, intermediate: 2, advanced: 3 };
          return order[a.difficulty] - order[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, difficultyFilter]);

  return (
    <section id="challenges" className="bg-[#f0fdf4] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            When AI gives bad advice, it looks like this
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Each card shows a real failure pattern: what AI says, why it's wrong, and how to prompt
            better.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-2 border-teal-100 bg-white py-3 pr-4 pl-12 text-gray-800 placeholder-gray-400 transition-colors focus:border-teal-400 focus:outline-none"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 transition-colors ${
                showFilters
                  ? 'bg-teal-500 text-white'
                  : 'border-2 border-teal-100 bg-white text-gray-600 hover:border-teal-400'
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mb-4 rounded-xl border-2 border-teal-100 bg-white p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="failure-rate">Highest Failure Rate</option>
                    <option value="bookmarks">Most Bookmarked</option>
                    <option value="shares">Most Shared</option>
                    <option value="difficulty">Difficulty (Easy First)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">Difficulty</label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Category filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredChallenges.length} of {challenges.length} challenges
          </p>
        </div>

        {/* Challenge grid */}
        {filteredChallenges.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-teal-100 bg-white py-16 text-center">
            <p className="text-gray-500">No challenges match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDifficultyFilter('all');
              }}
              className="mt-4 font-medium text-teal-600 hover:text-teal-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
