'use client';

import { ArrowRight } from 'lucide-react';

interface CTABlockProps {
  primary: {
    text: string;
    href: string;
    description?: string;
  };
  secondary?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'gradient';
}

export default function CTABlock({ primary, secondary, variant = 'default' }: CTABlockProps) {
  const isGradient = variant === 'gradient';

  return (
    <div
      className={`rounded-2xl p-8 ${isGradient ? 'header-gradient text-white' : 'border-2 border-teal-100 bg-[#f0fdf4]'}`}
    >
      <div className="mx-auto max-w-xl text-center">
        {primary.description && (
          <p className={`mb-6 ${isGradient ? 'text-white/90' : 'text-gray-600'}`}>
            {primary.description}
          </p>
        )}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={primary.href}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${
              isGradient
                ? 'bg-white text-teal-700 hover:bg-gray-100'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            {primary.text}
            <ArrowRight className="h-4 w-4" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-colors ${
                isGradient
                  ? 'border border-white/30 bg-white/20 text-white hover:bg-white/30'
                  : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {secondary.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
