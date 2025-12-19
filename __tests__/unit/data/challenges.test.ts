import { describe, it, expect } from 'vitest';
import { challenges, categoryMeta, Challenge, ChallengeCategory } from '@/data/challenges';

describe('challenges data', () => {
  describe('data integrity', () => {
    it('should have at least one challenge', () => {
      expect(challenges.length).toBeGreaterThan(0);
    });

    it('should have unique IDs', () => {
      const ids = challenges.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid categories for all challenges', () => {
      const validCategories = Object.keys(categoryMeta) as ChallengeCategory[];
      challenges.forEach((challenge) => {
        expect(validCategories).toContain(challenge.category);
      });
    });
  });

  describe('required fields', () => {
    it.each(challenges)(
      'challenge "$id" should have all required fields',
      (challenge: Challenge) => {
        expect(challenge.id).toBeTruthy();
        expect(challenge.category).toBeTruthy();
        expect(challenge.title).toBeTruthy();
        expect(challenge.description).toBeTruthy();
        expect(challenge.difficulty).toBeTruthy();
        expect(typeof challenge.aiFailureRate).toBe('number');
        expect(challenge.commonMistakes.length).toBeGreaterThan(0);
        expect(challenge.goodExample).toBeTruthy();
        expect(challenge.badExample).toBeTruthy();
        expect(challenge.tags.length).toBeGreaterThan(0);
      }
    );
  });

  describe('aiFailureRate validation', () => {
    it.each(challenges)(
      'challenge "$id" should have aiFailureRate between 0 and 100',
      (challenge: Challenge) => {
        expect(challenge.aiFailureRate).toBeGreaterThanOrEqual(0);
        expect(challenge.aiFailureRate).toBeLessThanOrEqual(100);
      }
    );
  });

  describe('difficulty levels', () => {
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];

    it.each(challenges)(
      'challenge "$id" should have a valid difficulty level',
      (challenge: Challenge) => {
        expect(validDifficulties).toContain(challenge.difficulty);
      }
    );
  });

  describe('examples validation', () => {
    it.each(challenges)(
      'challenge "$id" should have valid goodExample structure',
      (challenge: Challenge) => {
        expect(challenge.goodExample.prompt).toBeTruthy();
        expect(challenge.goodExample.response).toBeTruthy();
      }
    );

    it.each(challenges)(
      'challenge "$id" should have valid badExample structure with whyBad',
      (challenge: Challenge) => {
        expect(challenge.badExample.prompt).toBeTruthy();
        expect(challenge.badExample.response).toBeTruthy();
        expect(challenge.badExample.whyBad).toBeTruthy();
      }
    );
  });

  describe('D&D/Tarot fields', () => {
    const challengesWithArchetype = challenges.filter((c) => c.archetype);

    it('should have at least some challenges with archetypes', () => {
      expect(challengesWithArchetype.length).toBeGreaterThan(0);
    });

    it.each(challengesWithArchetype)(
      'challenge "$id" with archetype should have valid archetype structure',
      (challenge: Challenge) => {
        expect(challenge.archetype?.name).toBeTruthy();
        expect(challenge.archetype?.symbol).toBeTruthy();
      }
    );

    const challengesWithHiddenEval = challenges.filter((c) => c.hiddenEval);

    it.each(challengesWithHiddenEval)(
      'challenge "$id" with hiddenEval should have valid principle',
      (challenge: Challenge) => {
        const validPrinciples = [
          'eval',
          'constraint',
          'iteration',
          'specificity',
          'tradeoff',
          'humility',
          'system',
          'embodiment',
        ];
        expect(validPrinciples).toContain(challenge.hiddenEval?.principle);
      }
    );
  });

  describe('connectsTo references', () => {
    const allIds = challenges.map((c) => c.id);
    const challengesWithConnections = challenges.filter((c) => c.connectsTo?.length);

    it.each(challengesWithConnections)(
      'challenge "$id" connectsTo should reference existing challenge IDs',
      (challenge: Challenge) => {
        challenge.connectsTo?.forEach((connectedId) => {
          expect(allIds).toContain(connectedId);
        });
      }
    );
  });
});

describe('categoryMeta', () => {
  const categories = Object.keys(categoryMeta) as ChallengeCategory[];

  it.each(categories)('category "%s" should have all required meta fields', (category) => {
    const meta = categoryMeta[category];
    expect(meta.label).toBeTruthy();
    expect(meta.icon).toBeTruthy();
    expect(meta.color).toBeTruthy();
    expect(meta.description).toBeTruthy();
  });

  it('should cover all categories used in challenges', () => {
    const usedCategories = new Set(challenges.map((c) => c.category));
    usedCategories.forEach((category) => {
      expect(categoryMeta[category]).toBeDefined();
    });
  });
});
