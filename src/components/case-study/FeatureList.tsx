'use client';

import { CaseStudyFeature } from '@/data/case-studies';

interface FeatureListProps {
  features: CaseStudyFeature[];
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="rounded-xl border-2 border-teal-100 bg-white p-5 transition-colors hover:border-teal-300"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-700">
              {feature.icon}
            </span>
            <div>
              <h3 className="mb-1 font-semibold text-gray-800">{feature.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{feature.description}</p>
              <p className="text-xs font-medium text-teal-600">{feature.benefit}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
