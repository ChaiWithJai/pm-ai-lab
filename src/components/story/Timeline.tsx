'use client';

import { TimelineEvent } from '@/data/jai-story';

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const getTypeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'career':
        return 'bg-teal-500';
      case 'health':
        return 'bg-red-400';
      case 'learning':
        return 'bg-purple-500';
      case 'breakthrough':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getTypeBg = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'career':
        return 'bg-teal-50 border-teal-200';
      case 'health':
        return 'bg-red-50 border-red-200';
      case 'learning':
        return 'bg-purple-50 border-purple-200';
      case 'breakthrough':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-4 w-0.5 transform bg-teal-200 md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`relative flex flex-col gap-4 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 z-10 mt-6 h-3 w-3 -translate-x-1/2 transform rounded-full md:left-1/2">
              <div className={`h-full w-full rounded-full ${getTypeColor(event.type)}`} />
            </div>

            {/* Content card */}
            <div
              className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
            >
              <div className={`rounded-xl border p-5 ${getTypeBg(event.type)}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-500">{event.year}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${getTypeColor(event.type)} text-white`}
                  >
                    {event.type}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-800">{event.title}</h3>
                <p className="mb-3 text-sm text-gray-600">{event.description}</p>
                <div className="border-opacity-10 border-t border-current pt-3">
                  <p className="text-sm text-gray-700 italic">"{event.insight}"</p>
                </div>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
