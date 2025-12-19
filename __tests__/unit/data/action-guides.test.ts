import { describe, it, expect } from 'vitest';
import {
  timeHorizonGuides,
  timeHorizonMeta,
  getGuideBySlug,
  getAllGuideSlugs,
  TimeHorizon,
  TimeHorizonGuide,
} from '@/data/action-guides';

describe('timeHorizonGuides data', () => {
  describe('data integrity', () => {
    it('should have all 5 time horizons', () => {
      expect(timeHorizonGuides.length).toBe(5);
    });

    it('should have unique IDs', () => {
      const ids = timeHorizonGuides.map((g) => g.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique slugs', () => {
      const slugs = timeHorizonGuides.map((g) => g.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have matching id and slug', () => {
      timeHorizonGuides.forEach((guide) => {
        expect(guide.id).toBe(guide.slug);
      });
    });
  });

  describe('required fields', () => {
    it.each(timeHorizonGuides)(
      'guide "$id" should have all required fields',
      (guide: TimeHorizonGuide) => {
        expect(guide.id).toBeTruthy();
        expect(guide.slug).toBeTruthy();
        expect(guide.headline).toBeTruthy();
        expect(guide.subheadline).toBeTruthy();
        expect(guide.intro).toBeTruthy();
        expect(guide.mindset).toBeTruthy();
        expect(guide.actions.length).toBeGreaterThan(0);
        expect(guide.cta).toBeDefined();
        expect(guide.cta.primary).toBeDefined();
        expect(guide.cta.primary.text).toBeTruthy();
        expect(guide.cta.primary.href).toBeTruthy();
      }
    );
  });

  describe('actions validation', () => {
    timeHorizonGuides.forEach((guide) => {
      describe(`guide "${guide.id}" actions`, () => {
        it.each(guide.actions)('action "$id" should have required fields', (action) => {
          expect(action.id).toBeTruthy();
          expect(action.title).toBeTruthy();
          expect(action.description).toBeTruthy();
          expect(action.why).toBeTruthy();
          expect(action.difficulty).toBeTruthy();
          expect(action.timeEstimate).toBeTruthy();
          expect(action.howTo.length).toBeGreaterThan(0);
          expect(action.outcome).toBeTruthy();
        });

        it.each(guide.actions)('action "$id" should have valid difficulty', (action) => {
          expect(['easy', 'medium', 'hard']).toContain(action.difficulty);
        });

        it.each(guide.actions)('action "$id" howTo steps should be numbered', (action) => {
          action.howTo.forEach((step, index) => {
            expect(step.step).toBe(index + 1);
            expect(step.instruction).toBeTruthy();
          });
        });
      });
    });
  });

  describe('navigation chain', () => {
    it('should form a complete navigation chain', () => {
      const expectedOrder: TimeHorizon[] = [
        'today',
        'this-week',
        'this-month',
        'this-quarter',
        'long-game',
      ];

      // First guide should have no prev
      const first = timeHorizonGuides.find((g) => g.id === 'today');
      expect(first?.prev).toBeUndefined();
      expect(first?.next).toBe('this-week');

      // Last guide should have no next
      const last = timeHorizonGuides.find((g) => g.id === 'long-game');
      expect(last?.next).toBeUndefined();
      expect(last?.prev).toBe('this-quarter');

      // Middle guides should have both
      const middle = timeHorizonGuides.filter((g) => g.id !== 'today' && g.id !== 'long-game');
      middle.forEach((guide) => {
        expect(guide.prev).toBeTruthy();
        expect(guide.next).toBeTruthy();
      });

      // Verify order
      expectedOrder.forEach((id, index) => {
        const guide = timeHorizonGuides.find((g) => g.id === id);
        if (index < expectedOrder.length - 1) {
          expect(guide?.next).toBe(expectedOrder[index + 1]);
        }
        if (index > 0) {
          expect(guide?.prev).toBe(expectedOrder[index - 1]);
        }
      });
    });
  });
});

describe('timeHorizonMeta', () => {
  const horizons: TimeHorizon[] = ['today', 'this-week', 'this-month', 'this-quarter', 'long-game'];

  it.each(horizons)('horizon "%s" should have meta information', (horizon) => {
    const meta = timeHorizonMeta[horizon];
    expect(meta).toBeDefined();
    expect(meta.label).toBeTruthy();
    expect(meta.shortLabel).toBeTruthy();
    expect(meta.icon).toBeTruthy();
  });
});

describe('helper functions', () => {
  describe('getGuideBySlug', () => {
    it('should return guide for valid slug', () => {
      const guide = getGuideBySlug('today');
      expect(guide).toBeDefined();
      expect(guide?.id).toBe('today');
    });

    it('should return undefined for invalid slug', () => {
      const guide = getGuideBySlug('invalid-slug');
      expect(guide).toBeUndefined();
    });
  });

  describe('getAllGuideSlugs', () => {
    it('should return all slugs', () => {
      const slugs = getAllGuideSlugs();
      expect(slugs.length).toBe(5);
      expect(slugs).toContain('today');
      expect(slugs).toContain('this-week');
      expect(slugs).toContain('this-month');
      expect(slugs).toContain('this-quarter');
      expect(slugs).toContain('long-game');
    });
  });
});
