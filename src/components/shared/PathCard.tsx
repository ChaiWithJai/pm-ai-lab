'use client';

import { ArrowRight } from 'lucide-react';

interface PathCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  accent?: 'teal' | 'purple' | 'amber';
}

export default function PathCard({
  title,
  description,
  href,
  icon,
  accent = 'teal',
}: PathCardProps) {
  const accentColors = {
    teal: 'bg-teal-100 text-teal-700 group-hover:bg-teal-500 group-hover:text-white',
    purple: 'bg-purple-100 text-purple-700 group-hover:bg-purple-500 group-hover:text-white',
    amber: 'bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white',
  };

  return (
    <a
      href={href}
      className="group block rounded-2xl border-2 border-teal-100 bg-white p-6 transition-all hover:border-teal-300 hover:shadow-lg"
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-colors ${accentColors[accent]}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-teal-700">
        {title}
      </h3>
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-all group-hover:gap-2">
        Get started
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}
