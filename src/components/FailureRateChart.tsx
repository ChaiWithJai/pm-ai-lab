'use client';

import { datasetStats, evaluationFramework } from '@/data/challenges';

export default function FailureRateChart() {
  const qualityData = Object.entries(datasetStats.qualityDistribution);

  return (
    <section id="data" className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">How do we know AI is wrong?</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            We tested {datasetStats.totalQuestions.toLocaleString()} AI responses against
            professional PM standards. Here's what we found.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Quality Distribution */}
          <div className="rounded-2xl border-2 border-teal-100 bg-[#f0fdf4] p-6">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">Most AI output needs work</h3>
            <div className="space-y-4">
              {qualityData.map(([label, percentage]) => {
                const colors: Record<string, string> = {
                  'Keep practicing': 'bg-red-400',
                  'Getting it': 'bg-amber-400',
                  Great: 'bg-green-400',
                };
                return (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-600">{label}</span>
                      <span className="font-bold text-gray-800">{percentage}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${colors[label] || 'bg-gray-400'} transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 border-t border-teal-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Overall Failure Rate</span>
                <span className="text-2xl font-bold text-red-500">
                  {datasetStats.generalLanguageFailureRate}%
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Questions using generic language like &quot;typical&quot;, &quot;usually&quot;, or
                &quot;generally&quot;
              </p>
            </div>
          </div>

          {/* Evaluation Framework */}
          <div className="rounded-2xl border-2 border-teal-100 bg-[#f0fdf4] p-6">
            <h3 className="mb-1 text-lg font-semibold text-gray-800">What "good" looks like</h3>
            <p className="mb-6 text-sm text-gray-500">
              Based on Teresa Torres' Interview Coach standards
            </p>

            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                Good PM questions do these 4 things
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {evaluationFramework.dimensions.map((dim) => (
                  <div key={dim.id} className="rounded-xl border border-teal-200 bg-white p-3">
                    <div className="mb-1 text-sm font-medium text-teal-700">{dim.label}</div>
                    <div className="text-xs text-gray-500">{dim.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                AI does these things constantly
              </h4>
              <div className="space-y-2">
                {evaluationFramework.catastrophicFailures.map((failure) => (
                  <div
                    key={failure.id}
                    className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3"
                  >
                    <span className="text-lg text-red-500">⚠️</span>
                    <div>
                      <div className="text-sm font-medium text-red-700">{failure.label}</div>
                      <div className="text-xs text-gray-500">&quot;{failure.example}&quot;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Source badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2">
            <span className="text-xs text-gray-500">Data Source:</span>
            <span className="text-sm font-medium text-gray-700">Anthropic Interviewer Dataset</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2">
            <span className="text-xs text-gray-500">Challenges from:</span>
            <span className="text-sm font-medium text-gray-700">Product Catalyst Dataset</span>
          </div>
        </div>
      </div>
    </section>
  );
}
