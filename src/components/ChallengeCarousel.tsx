'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Challenge, categoryMeta } from '@/data/challenges';
import Link from 'next/link';

interface ChallengeCarouselProps {
  challenges: Challenge[];
  title?: string;
  showViewAll?: boolean;
}

export default function ChallengeCarousel({
  challenges,
  title = 'Featured Challenges',
  showViewAll = true,
}: ChallengeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', updateScrollButtons);
      return () => scrollEl.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 320; // approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-amber-100 text-amber-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFailureColor = (rate: number) => {
    if (rate < 30) return 'text-green-600';
    if (rate < 45) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          {/* Navigation arrows - hidden on mobile */}
          <div className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`rounded-full border p-2 transition-colors ${
                canScrollLeft
                  ? 'border-teal-200 text-teal-600 hover:border-teal-300 hover:bg-teal-50'
                  : 'cursor-not-allowed border-gray-200 text-gray-300'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`rounded-full border p-2 transition-colors ${
                canScrollRight
                  ? 'border-teal-200 text-teal-600 hover:border-teal-300 hover:bg-teal-50'
                  : 'cursor-not-allowed border-gray-200 text-gray-300'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {showViewAll && (
            <Link
              href="#all-challenges"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              View all →
            </Link>
          )}
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Left fade gradient */}
        <div
          className={`pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f0fdf4] to-transparent transition-opacity ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: '0.5rem',
          }}
        >
          {challenges.map((challenge) => {
            const category = categoryMeta[challenge.category];
            return (
              <div
                key={challenge.id}
                className="scroll-snap-align-start group w-[300px] flex-shrink-0 cursor-pointer rounded-xl border-2 border-teal-100 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-lg"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Category + Difficulty */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category?.icon}</span>
                    <span className="text-xs text-gray-500">{category?.label}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h4 className="mb-2 line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-teal-700">
                  {challenge.title}
                </h4>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{challenge.description}</p>

                {/* Footer: Failure rate + archetype hint */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${getFailureColor(challenge.aiFailureRate)}`}>
                      {challenge.aiFailureRate}%
                    </span>
                    <span className="text-xs text-gray-500">failure</span>
                  </div>
                  {challenge.archetype && (
                    <span
                      className="text-lg opacity-60 transition-opacity group-hover:opacity-100"
                      title={challenge.archetype.name}
                    >
                      {challenge.archetype.symbol}
                    </span>
                  )}
                </div>

                {/* Failure rate bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="failure-rate-bar h-full rounded-full"
                    style={{ width: `${Math.min(challenge.aiFailureRate, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right fade gradient */}
        <div
          className={`pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-[#f0fdf4] to-transparent transition-opacity ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Mobile swipe hint */}
      <p className="mt-3 text-center text-xs text-gray-400 md:hidden">Swipe to see more →</p>
    </div>
  );
}
