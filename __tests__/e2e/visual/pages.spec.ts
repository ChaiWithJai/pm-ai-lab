import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.describe('Homepage', () => {
    test('should match homepage visual snapshot', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Wait for fonts and images to load
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('should match homepage hero section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const hero = page.locator('section').first();
      if (await hero.isVisible()) {
        await expect(hero).toHaveScreenshot('homepage-hero.png', {
          maxDiffPixelRatio: 0.05,
        });
      }
    });
  });

  test.describe('Challenges Page', () => {
    test('should match challenges page visual snapshot', async ({ page }) => {
      await page.goto('/challenges');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('challenges.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Action Guides', () => {
    test('should match /do/today visual snapshot', async ({ page }) => {
      await page.goto('/do/today');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('do-today.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('should match /do/this-week visual snapshot', async ({ page }) => {
      await page.goto('/do/this-week');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('do-this-week.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Responsive Layouts', () => {
    test('should match mobile homepage', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('should match tablet homepage', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Component Snapshots', () => {
    test('should match challenge card style', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Find a challenge card
      const card = page
        .locator('[class*="rounded-xl"][class*="border"]')
        .filter({ hasText: /failure/i })
        .first();

      if (await card.isVisible()) {
        await expect(card).toHaveScreenshot('challenge-card.png', {
          maxDiffPixelRatio: 0.05,
        });
      }
    });
  });

  test.describe('Dark/Light Theme', () => {
    test('should match light theme', async ({ page }) => {
      await page.goto('/');
      await page.emulateMedia({ colorScheme: 'light' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('homepage-light.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    // Only run if dark mode is supported
    test('should handle dark theme preference', async ({ page }) => {
      await page.goto('/');
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Just verify page loads without error in dark mode
      await expect(page.locator('body')).toBeVisible();
    });
  });
});
