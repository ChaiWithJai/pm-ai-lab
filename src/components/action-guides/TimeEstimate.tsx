'use client';

import { Clock } from 'lucide-react';

interface TimeEstimateProps {
  estimate: string;
}

export default function TimeEstimate({ estimate }: TimeEstimateProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
      <Clock className="h-3 w-3" />
      {estimate}
    </span>
  );
}
