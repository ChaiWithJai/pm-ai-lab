'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { datasetStats } from '@/data/challenges';
import ParrotMascot from './ParrotMascot';

const stats = [
  {
    value: datasetStats.totalQuestions.toLocaleString(),
    label: 'AI outputs analyzed',
    icon: '🔍',
  },
  {
    value: datasetStats.totalChallenges.toLocaleString(),
    label: 'failure patterns found',
    icon: '📋',
  },
  {
    value: '12',
    label: 'PM skill areas covered',
    icon: '📂',
  },
  {
    value: `${datasetStats.generalLanguageFailureRate}%`,
    label: 'of AI advice is wrong',
    icon: '⚠️',
  },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      const challengesSection = document.getElementById('challenges');
      challengesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Header gradient background */}
      <div className="header-gradient text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Logo/Brand */}
              <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <span className="text-2xl">🦜</span>
                </div>
                <span className="text-2xl font-bold">PM AI Lab</span>
              </div>

              {/* Headline */}
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Your AI copilot is giving you bad PM advice.
              </h1>

              {/* Subheadline */}
              <h2 className="mb-8 text-lg text-white/90 md:text-xl">
                See the exact prompts that fail, why they fail, and how to fix them.
              </h2>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="mx-auto max-w-xl lg:mx-0">
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search: interviews, roadmaps, MVPs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-white py-4 pr-4 pl-12 text-lg text-gray-800 placeholder-gray-500 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Right - Parrot mascot */}
            <div className="flex-shrink-0">
              <ParrotMascot size="xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-[#f0fdf4] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-2 gap-4 md:grid-cols-4 ${mounted ? 'stat-animate' : 'opacity-0'}`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-2 text-2xl">{stat.icon}</div>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
