import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChallengeCarousel from '@/components/ChallengeCarousel';
import { challenges, Challenge } from '@/data/challenges';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Sample challenges for testing
const sampleChallenges: Challenge[] = challenges.slice(0, 3);

describe('ChallengeCarousel', () => {
  describe('rendering', () => {
    it('should render the carousel with default title', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      expect(screen.getByText('Featured Challenges')).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} title="Test Challenges" />);
      expect(screen.getByText('Test Challenges')).toBeInTheDocument();
    });

    it('should render all provided challenges', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      sampleChallenges.forEach((challenge) => {
        expect(screen.getByText(challenge.title)).toBeInTheDocument();
      });
    });

    it('should display challenge descriptions', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      sampleChallenges.forEach((challenge) => {
        expect(screen.getByText(challenge.description)).toBeInTheDocument();
      });
    });

    it('should display AI failure rates', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      sampleChallenges.forEach((challenge) => {
        expect(screen.getByText(`${challenge.aiFailureRate}%`)).toBeInTheDocument();
      });
    });

    it('should display difficulty badges', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      // Use getAllByText since multiple challenges may have the same difficulty
      const difficulties = new Set(sampleChallenges.map((c) => c.difficulty));
      difficulties.forEach((difficulty) => {
        const badges = screen.getAllByText(difficulty);
        expect(badges.length).toBeGreaterThan(0);
      });
    });
  });

  describe('View All link', () => {
    it('should show View All link by default', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      expect(screen.getByText('View all →')).toBeInTheDocument();
    });

    it('should hide View All link when showViewAll is false', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} showViewAll={false} />);
      expect(screen.queryByText('View all →')).not.toBeInTheDocument();
    });
  });

  describe('navigation buttons', () => {
    it('should render scroll left button', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
    });

    it('should render scroll right button', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
    });

    it('should have disabled left scroll button initially', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      const leftButton = screen.getByLabelText('Scroll left');
      expect(leftButton).toBeDisabled();
    });
  });

  describe('archetype display', () => {
    it('should display archetype symbols when present', () => {
      const challengesWithArchetype = challenges.filter((c) => c.archetype);
      if (challengesWithArchetype.length > 0) {
        render(<ChallengeCarousel challenges={challengesWithArchetype.slice(0, 3)} />);
        challengesWithArchetype.slice(0, 3).forEach((challenge) => {
          if (challenge.archetype) {
            expect(screen.getByTitle(challenge.archetype.name)).toBeInTheDocument();
          }
        });
      }
    });
  });

  describe('category display', () => {
    it('should display category icons and labels', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      // Check that category labels are displayed
      sampleChallenges.forEach((challenge) => {
        const categoryLabel =
          challenge.category === 'user-research'
            ? 'User Research'
            : challenge.category === 'customer-discovery'
              ? 'Customer Discovery'
              : challenge.category;
        const elements = screen.getAllByText(categoryLabel);
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('empty state', () => {
    it('should handle empty challenges array', () => {
      render(<ChallengeCarousel challenges={[]} />);
      expect(screen.getByText('Featured Challenges')).toBeInTheDocument();
      // No challenge cards should be rendered
      expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible navigation buttons', () => {
      render(<ChallengeCarousel challenges={sampleChallenges} />);
      expect(screen.getByLabelText('Scroll left')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('Scroll right')).toHaveAttribute('aria-label');
    });
  });
});
