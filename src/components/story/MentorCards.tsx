'use client';

import { Mentor } from '@/data/jai-story';
import { Quote } from 'lucide-react';

interface MentorCardsProps {
  mentors: Mentor[];
}

export default function MentorCards({ mentors }: MentorCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="rounded-2xl border-2 border-teal-100 bg-white p-6 transition-colors hover:border-teal-300"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
              <p className="text-sm text-gray-500">{mentor.role}</p>
            </div>
            <Quote className="h-5 w-5 text-teal-400" />
          </div>

          <div className="mb-4">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
              {mentor.lesson}
            </span>
          </div>

          <blockquote className="mb-4 border-l-2 border-teal-200 pl-3 text-sm text-gray-600 italic">
            "{mentor.quote}"
          </blockquote>

          {mentor.source && <p className="mb-4 text-xs text-gray-400">— via {mentor.source}</p>}

          <div className="border-t border-teal-100 pt-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium text-teal-700">Impact:</span> {mentor.impact}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
