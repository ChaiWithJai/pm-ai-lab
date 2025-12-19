import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TarotCard, ElementBadge } from '@/components/tarot';
import { challenges, Challenge } from '@/data/challenges';

// Get a challenge with full archetype data for testing
const getTestChallenge = (): Challenge => {
  const challenge = challenges.find((c) => c.archetype && c.hiddenEval);
  if (!challenge) {
    throw new Error('No challenge with archetype data found');
  }
  return challenge;
};

describe('TarotCard', () => {
  describe('rendering', () => {
    it('should render front face by default', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      // Front face should show archetype name
      expect(screen.getByText(challenge.archetype!.name)).toBeInTheDocument();

      // Front face should show symbol
      expect(screen.getByText(challenge.archetype!.symbol)).toBeInTheDocument();

      // Front face should show challenge title
      expect(screen.getByText(challenge.title)).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      const challenge = getTestChallenge();

      const { rerender } = render(<TarotCard challenge={challenge} size="sm" />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<TarotCard challenge={challenge} size="md" />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<TarotCard challenge={challenge} size="lg" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should show difficulty badge', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      expect(screen.getByText(challenge.difficulty)).toBeInTheDocument();
    });

    it('should show failure rate', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      expect(screen.getByText(`${challenge.aiFailureRate}% fail`)).toBeInTheDocument();
    });
  });

  describe('flip interaction', () => {
    it('should flip to back on click', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      const card = screen.getByRole('button');
      fireEvent.click(card);

      // After flip, hidden principle should be visible (capitalized, e.g., "Specificity")
      if (challenge.hiddenEval?.principle) {
        const principleText =
          challenge.hiddenEval.principle.charAt(0).toUpperCase() +
          challenge.hiddenEval.principle.slice(1);
        expect(screen.getByText(principleText)).toBeInTheDocument();
      }
    });

    it('should flip back on second click', () => {
      const challenge = getTestChallenge();
      const onFlip = vi.fn();
      render(<TarotCard challenge={challenge} onFlip={onFlip} />);

      const card = screen.getByRole('button');

      // First click - flip to back
      fireEvent.click(card);
      expect(onFlip).toHaveBeenCalledWith(true);

      // Second click - flip to front
      fireEvent.click(card);
      expect(onFlip).toHaveBeenCalledWith(false);
    });

    it('should flip on Enter key press', () => {
      const challenge = getTestChallenge();
      const onFlip = vi.fn();
      render(<TarotCard challenge={challenge} onFlip={onFlip} />);

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(onFlip).toHaveBeenCalledWith(true);
    });

    it('should flip on Space key press', () => {
      const challenge = getTestChallenge();
      const onFlip = vi.fn();
      render(<TarotCard challenge={challenge} onFlip={onFlip} />);

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });

      expect(onFlip).toHaveBeenCalledWith(true);
    });

    it('should not flip when interactive is false', () => {
      const challenge = getTestChallenge();
      const onFlip = vi.fn();
      render(<TarotCard challenge={challenge} interactive={false} onFlip={onFlip} />);

      const card = screen.getByLabelText(new RegExp(challenge.archetype!.name));
      fireEvent.click(card);

      expect(onFlip).not.toHaveBeenCalled();
    });

    it('should start flipped when initialFlipped is true', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} initialFlipped={true} />);

      // Back face content should be visible (hidden principle, capitalized)
      if (challenge.hiddenEval?.principle) {
        const principleText =
          challenge.hiddenEval.principle.charAt(0).toUpperCase() +
          challenge.hiddenEval.principle.slice(1);
        expect(screen.getByText(principleText)).toBeInTheDocument();
      }
    });
  });

  describe('element styling', () => {
    it('should apply element-based styling', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      const card = screen.getByRole('button');
      const element = challenge.archetype?.element;

      if (element) {
        expect(card).toHaveClass(`element-glow-${element}`);
      }
    });
  });

  describe('accessibility', () => {
    it('should be focusable when interactive', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} interactive={true} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('should not be focusable when not interactive', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} interactive={false} />);

      const card = screen.getByLabelText(new RegExp(challenge.archetype!.name));
      expect(card).toHaveAttribute('tabIndex', '-1');
    });

    it('should have appropriate aria-label', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label');
      expect(card.getAttribute('aria-label')).toContain(challenge.archetype!.name);
    });

    it('should have aria-pressed attribute when interactive', () => {
      const challenge = getTestChallenge();
      render(<TarotCard challenge={challenge} interactive={true} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(card);
      expect(card).toHaveAttribute('aria-pressed', 'true');
    });
  });
});

describe('ElementBadge', () => {
  describe('rendering', () => {
    it('should render fire element badge', () => {
      render(<ElementBadge element="fire" />);
      expect(screen.getByText('🔥')).toBeInTheDocument();
    });

    it('should render water element badge', () => {
      render(<ElementBadge element="water" />);
      expect(screen.getByText('💧')).toBeInTheDocument();
    });

    it('should render earth element badge', () => {
      render(<ElementBadge element="earth" />);
      expect(screen.getByText('🌍')).toBeInTheDocument();
    });

    it('should render air element badge', () => {
      render(<ElementBadge element="air" />);
      expect(screen.getByText('💨')).toBeInTheDocument();
    });

    it('should render spirit element badge', () => {
      render(<ElementBadge element="spirit" />);
      expect(screen.getByText('✨')).toBeInTheDocument();
    });

    it('should show label when showLabel is true', () => {
      render(<ElementBadge element="fire" showLabel={true} />);
      expect(screen.getByText('fire')).toBeInTheDocument();
    });

    it('should not show label by default', () => {
      render(<ElementBadge element="fire" />);
      expect(screen.queryByText('fire')).not.toBeInTheDocument();
    });
  });
});

describe('All challenges have archetype data', () => {
  it('should have archetype data for all 12 challenges', () => {
    const challengesWithArchetype = challenges.filter((c) => c.archetype);
    expect(challengesWithArchetype).toHaveLength(12);
  });

  it('should have hiddenEval data for all challenges with archetype', () => {
    const challengesWithArchetype = challenges.filter((c) => c.archetype);
    challengesWithArchetype.forEach((challenge) => {
      expect(challenge.hiddenEval).toBeDefined();
      expect(challenge.hiddenEval?.principle).toBeDefined();
      expect(challenge.hiddenEval?.reversedMeaning).toBeDefined();
    });
  });

  it('should have element defined for all archetypes', () => {
    const challengesWithArchetype = challenges.filter((c) => c.archetype);
    challengesWithArchetype.forEach((challenge) => {
      expect(challenge.archetype?.element).toBeDefined();
      expect(['fire', 'water', 'earth', 'air', 'spirit']).toContain(challenge.archetype?.element);
    });
  });

  it('should have all elements represented', () => {
    const elements = new Set(
      challenges.filter((c) => c.archetype?.element).map((c) => c.archetype!.element)
    );
    expect(elements.size).toBeGreaterThanOrEqual(4);
  });
});
