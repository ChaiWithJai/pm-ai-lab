'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { Action } from '@/data/action-guides';
import DifficultyBadge from './DifficultyBadge';
import TimeEstimate from './TimeEstimate';

interface ActionCardProps {
  action: Action;
  index: number;
}

export default function ActionCard({ action, index }: ActionCardProps) {
  const [expanded, setExpanded] = useState(index === 0); // First action expanded by default

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-teal-100 bg-white">
      {/* Header - always visible */}
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{action.description}</p>
            </div>
          </div>
        </div>

        {/* Meta badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <TimeEstimate estimate={action.timeEstimate} />
          <DifficultyBadge difficulty={action.difficulty} />
          {action.tools && action.tools.length > 0 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {action.tools[0]}
              {action.tools.length > 1 && ` +${action.tools.length - 1}`}
            </span>
          )}
        </div>

        {/* Why this matters */}
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
          <h4 className="mb-1 text-sm font-medium text-amber-800">Why this matters</h4>
          <p className="text-sm text-amber-700">{action.why}</p>
        </div>
      </div>

      {/* Expandable section */}
      <div className="border-t border-teal-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm text-gray-500 transition-colors hover:bg-teal-50/50 hover:text-teal-600"
        >
          <span>{expanded ? 'Hide steps' : 'Show how to do this'}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded && (
          <div className="space-y-6 px-6 pb-6">
            {/* How-to steps */}
            <div>
              <h4 className="mb-4 text-sm font-medium text-gray-700">Step by step</h4>
              <ol className="space-y-4">
                {action.howTo.map((step) => (
                  <li key={step.step} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-700">
                      {step.step}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{step.instruction}</p>
                      {step.tip && (
                        <p className="mt-1 text-xs text-gray-500 italic">Tip: {step.tip}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Outcome */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                <div>
                  <h4 className="mb-1 text-sm font-medium text-green-800">When you're done</h4>
                  <p className="text-sm text-green-700">{action.outcome}</p>
                </div>
              </div>
            </div>

            {/* Related challenges */}
            {action.relatedChallengeIds && action.relatedChallengeIds.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500">
                  Related challenges: {action.relatedChallengeIds.join(', ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
