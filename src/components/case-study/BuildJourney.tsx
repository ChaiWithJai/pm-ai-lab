'use client';

import { BuildWeek } from '@/data/case-studies';
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface BuildJourneyProps {
  weeks: BuildWeek[];
}

export default function BuildJourney({ weeks }: BuildJourneyProps) {
  return (
    <div className="space-y-6">
      {weeks.map((week) => (
        <div
          key={week.week}
          className="overflow-hidden rounded-2xl border-2 border-teal-100 bg-white"
        >
          {/* Week header */}
          <div className="border-b border-teal-100 bg-teal-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                {week.week}
              </span>
              <div>
                <h3 className="font-semibold text-gray-800">{week.title}</h3>
                <p className="text-sm text-gray-600">{week.goal}</p>
              </div>
            </div>
          </div>

          {/* Week content */}
          <div className="space-y-4 p-6">
            {/* What I learned */}
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                What I learned
              </h4>
              <ul className="space-y-1">
                {week.learned.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1 text-teal-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge and breakthrough */}
            <div className="grid gap-4 border-t border-gray-100 pt-4 md:grid-cols-2">
              <div className="rounded-xl bg-red-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  The challenge
                </h4>
                <p className="text-sm text-red-600">{week.challenge}</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  The breakthrough
                </h4>
                <p className="text-sm text-green-600">{week.breakthrough}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
