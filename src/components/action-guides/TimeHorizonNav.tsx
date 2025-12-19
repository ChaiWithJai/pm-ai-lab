'use client';

import Link from 'next/link';
import { timeHorizonMeta, TimeHorizon } from '@/data/action-guides';

interface TimeHorizonNavProps {
  current: TimeHorizon;
}

const horizons: TimeHorizon[] = ['today', 'this-week', 'this-month', 'this-quarter', 'long-game'];

export default function TimeHorizonNav({ current }: TimeHorizonNavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {horizons.map((horizon) => {
        const meta = timeHorizonMeta[horizon];
        const isActive = horizon === current;

        return (
          <Link
            key={horizon}
            href={`/do/${horizon}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-teal-500 text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-700'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  isActive ? 'bg-white/20' : 'bg-gray-100'
                }`}
              >
                {meta.icon}
              </span>
              <span className="hidden sm:inline">{meta.label}</span>
              <span className="sm:hidden">{meta.shortLabel}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
