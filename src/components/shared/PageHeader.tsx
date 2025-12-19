'use client';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  intro?: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, intro, badge }: PageHeaderProps) {
  return (
    <div className="border-b border-teal-100 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            {badge}
          </span>
        )}
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h1>
        {subtitle && <p className="mb-4 text-xl text-gray-600">{subtitle}</p>}
        {intro && <p className="max-w-2xl text-gray-500">{intro}</p>}
      </div>
    </div>
  );
}
