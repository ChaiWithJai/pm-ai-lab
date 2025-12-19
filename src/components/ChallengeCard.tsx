'use client';

import { useState } from 'react';
import {
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Challenge, categoryMeta } from '@/data/challenges';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showGood, setShowGood] = useState(true);

  const category = categoryMeta[challenge.category];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-amber-600 bg-amber-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getFailureRateColor = (rate: number) => {
    if (rate < 20) return 'text-green-600';
    if (rate < 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleShare = async () => {
    const shareData = {
      title: challenge.title,
      text: `PM AI Challenge: ${challenge.title} - ${challenge.aiFailureRate}% AI failure rate`,
      url: `${window.location.origin}/challenge/${challenge.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  return (
    <div className="challenge-card overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-xl">
              {category.icon}
            </span>
            <div>
              <span className="text-xs font-medium tracking-wider text-teal-600 uppercase">
                {category.label}
              </span>
              <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`rounded-lg p-2 transition-colors ${
                bookmarked
                  ? 'bg-teal-100 text-teal-600'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-600">{challenge.description}</p>

        {/* Meta info */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
          >
            {challenge.difficulty}
          </span>
          <div className="flex items-center gap-1">
            <AlertTriangle className={`h-3 w-3 ${getFailureRateColor(challenge.aiFailureRate)}`} />
            <span className={`text-xs font-medium ${getFailureRateColor(challenge.aiFailureRate)}`}>
              {challenge.aiFailureRate}% AI fail rate
            </span>
          </div>
          {challenge.framework && (
            <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700">
              {challenge.framework}
            </span>
          )}
        </div>

        {/* Failure rate bar */}
        <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="failure-rate-bar absolute top-0 left-0 h-full rounded-full"
            style={{ width: `${challenge.aiFailureRate}%` }}
          />
        </div>
      </div>

      {/* Expandable section */}
      <div className="border-t border-teal-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between px-5 py-3 text-sm text-gray-500 transition-colors hover:bg-teal-50/50 hover:text-teal-600"
        >
          <span>{expanded ? 'Hide examples' : 'See the bad prompt vs. good prompt'}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded && (
          <div className="space-y-5 px-5 pb-5">
            {/* Common mistakes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700">Common AI Mistakes</h4>
              <ul className="space-y-2">
                {challenge.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

            {/* Example toggle */}
            <div>
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setShowGood(true)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    showGood
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <CheckCircle className="mr-2 inline h-4 w-4" />
                  Good Example
                </button>
                <button
                  onClick={() => setShowGood(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    !showGood
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <XCircle className="mr-2 inline h-4 w-4" />
                  Bad Example
                </button>
              </div>

              <div
                className={`rounded-xl p-4 ${showGood ? 'border border-green-200 bg-green-50' : 'border border-red-200 bg-red-50'}`}
              >
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase">Prompt</span>
                  <p className="mt-1 text-sm text-gray-700">
                    {showGood ? challenge.goodExample.prompt : challenge.badExample.prompt}
                  </p>
                </div>
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase">AI Response</span>
                  <p className={`mt-1 text-sm ${showGood ? 'text-green-800' : 'text-red-800'}`}>
                    {showGood ? challenge.goodExample.response : challenge.badExample.response}
                  </p>
                </div>
                {!showGood && (
                  <div className="mt-3 border-t border-red-200 pt-3">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Why This Fails
                    </span>
                    <p className="mt-1 text-sm text-gray-600">{challenge.badExample.whyBad}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
