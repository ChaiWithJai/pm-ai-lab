'use client';

import { TransformationStage } from '@/data/jai-story';
import { ArrowRight } from 'lucide-react';

interface TransformationCardProps {
  stages: TransformationStage[];
}

export default function TransformationCard({ stages }: TransformationCardProps) {
  return (
    <div className="space-y-6">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className="overflow-hidden rounded-2xl border-2 border-teal-100 bg-white"
        >
          <div className="grid md:grid-cols-2">
            {/* Before */}
            <div className="border-b border-red-100 bg-red-50 p-6 md:border-r md:border-b-0">
              <span className="mb-3 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                Before
              </span>
              <h4 className="mb-3 font-semibold text-gray-800">{stage.before.state}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-red-700">Problem:</span> {stage.before.problem}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-red-700">Feeling:</span> {stage.before.feeling}
                </p>
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 p-6">
              <span className="mb-3 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                After
              </span>
              <h4 className="mb-3 font-semibold text-gray-800">{stage.after.state}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-green-700">Solution:</span>{' '}
                  {stage.after.solution}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-green-700">Feeling:</span> {stage.after.feeling}
                </p>
              </div>
            </div>
          </div>

          {/* Catalyst */}
          <div className="border-t border-amber-100 bg-amber-50 px-6 py-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                <span className="font-medium">Catalyst:</span> {stage.catalyst}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
