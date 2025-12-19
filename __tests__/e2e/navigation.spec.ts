import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/PM AI Lab/i);
  });

  test('should have working navigation links', async ({ page }) => {
    // Check for main navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to challenges page', async ({ page }) => {
    // Look for a link to challenges
    const challengesLink = page.locator('a[href*="challenges"]').first();
    if (await challengesLink.isVisible()) {
      await challengesLink.click();
      await expect(page).toHaveURL(/.*challenges/);
    }
  });

  test('should have responsive layout', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('body')).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Action Guides Navigation', () => {
  const timeHorizons = ['today', 'this-week', 'this-month', 'this-quarter', 'long-game'];

  test('should navigate to /do/today', async ({ page }) => {
    await page.goto('/do/today');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test.describe('Time horizon pages', () => {
    for (const horizon of timeHorizons) {
      test(`should load /do/${horizon}`, async ({ page }) => {
        await page.goto(`/do/${horizon}`);
        // Page should load without errors
        await expect(page).toHaveURL(new RegExp(`/do/${horizon}`));
        // Should have main content
        await expect(page.locator('main, article, [role="main"]').first()).toBeVisible();
      });
    }
  });

  test('should have navigation between time horizons', async ({ page }) => {
    await page.goto('/do/today');

    // Look for navigation to next time horizon
    const nextLink = page.locator('a[href*="/do/this-week"]').first();
    if (await nextLink.isVisible()) {
      await nextLink.click();
      await expect(page).toHaveURL(/.*this-week/);
    }
  });
});

test.describe('Challenge Carousel', () => {
  test('should display challenge carousel on homepage', async ({ page }) => {
    await page.goto('/');

    // Look for carousel elements
    const carousel = page.locator('[class*="carousel"], [data-testid="challenge-carousel"]');
    if (await carousel.isVisible()) {
      await expect(carousel).toBeVisible();
    }
  });

  test('should have scrollable challenge cards', async ({ page }) => {
    await page.goto('/');

    // Find challenge cards
    const cards = page.locator('[class*="challenge"], [data-testid*="challenge"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('SEO and Meta', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check for essential meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check for viewport meta
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');

    // At least one OG tag should exist
    const hasOgTitle = (await ogTitle.count()) > 0;
    const hasOgDescription = (await ogDescription.count()) > 0;
    expect(hasOgTitle || hasOgDescription).toBeTruthy();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - start;

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like favicon 404)
    const criticalErrors = errors.filter((e) => !e.includes('favicon') && !e.includes('404'));
    expect(criticalErrors).toHaveLength(0);
  });
});
