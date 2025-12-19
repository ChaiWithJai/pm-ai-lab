'use client';

import { Challenge, archetypeMeta } from '@/data/challenges';
import { cardSizes, getElementStyle } from '@/data/tarot-theme';

interface TarotCardBackProps {
  challenge: Challenge;
  size: 'sm' | 'md' | 'lg';
}

// Capitalize the first letter of each word
function formatPrinciple(principle: string): string {
  return principle.charAt(0).toUpperCase() + principle.slice(1);
}

// Get mentor name
function getMentorLabel(mentor?: string): string {
  switch (mentor) {
    case 'swyx':
      return 'swyx';
    case 'rahul-alex':
      return 'Rahul & Alex';
    case 'ash-maurya':
      return 'Ash Maurya';
    default:
      return '';
  }
}

export default function TarotCardBack({ challenge, size }: TarotCardBackProps) {
  const archetype = challenge.archetype;
  const hiddenEval = challenge.hiddenEval;
  const sizeStyles = cardSizes[size];
  const elementStyle = getElementStyle(archetype?.element);

  // Get archetype metadata
  const archetypeKey = archetype?.name.toLowerCase().replace(/\s+/g, '-');
  const meta = archetypeKey ? archetypeMeta[archetypeKey] : undefined;

  return (
    <div
      className={`tarot-card-face tarot-card-back flex flex-col ${elementStyle.bg} ${elementStyle.border} border-2`}
    >
      {/* Header: Hidden Principle */}
      <div className="px-4 pt-4 text-center">
        <span
          className={`inline-block rounded-full bg-gradient-to-r ${elementStyle.gradient} px-3 py-1 text-xs font-bold tracking-wider text-white uppercase`}
        >
          {hiddenEval?.principle ? formatPrinciple(hiddenEval.principle) : 'HIDDEN'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center px-4 py-4">
        {/* Reversed Meaning */}
        <div className="mb-4">
          <h4 className={`mb-2 text-xs font-semibold ${elementStyle.text} tracking-wide uppercase`}>
            Reversed Meaning
          </h4>
          <p className={`${sizeStyles.title} leading-relaxed text-gray-600 italic`}>
            {hiddenEval?.reversedMeaning || meta?.meaningReversed || 'When this pattern emerges...'}
          </p>
        </div>

        {/* Upright Meaning */}
        {meta?.meaningUpright && (
          <div className="mb-4">
            <h4
              className={`mb-2 text-xs font-semibold ${elementStyle.text} tracking-wide uppercase`}
            >
              Upright Meaning
            </h4>
            <p className={`${sizeStyles.title} leading-relaxed text-gray-600`}>
              {meta.meaningUpright}
            </p>
          </div>
        )}
      </div>

      {/* Footer: Mentor + Narrative Arc */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
        {challenge.mentorVoice && (
          <span className="text-xs text-gray-500">
            via <span className="font-medium">{getMentorLabel(challenge.mentorVoice)}</span>
          </span>
        )}
        {challenge.narrativeArc && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 capitalize">
            {challenge.narrativeArc.replace('-', ' ')}
          </span>
        )}
      </div>
    </div>
  );
}
