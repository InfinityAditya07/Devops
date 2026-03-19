import { expect, test } from '@playwright/test';

test.describe('Search Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input is visible with placeholder "Clothing"', async ({ page }) => {
    const input = page.getByPlaceholder('Clothing');
    await expect(input).toBeVisible();
  });

  test('typing in search updates input value', async ({ page }) => {
    const input = page.getByPlaceholder('Clothing');
    await input.fill('jeans');
    await expect(input).toHaveValue('jeans');
  });

  test('search input accepts special characters', async ({ page }) => {
    const input = page.getByPlaceholder('Clothing');
    await input.fill("Kid's wear");
    await expect(input).toHaveValue("Kid's wear");
  });

  test('search input can be cleared', async ({ page }) => {
    const input = page.getByPlaceholder('Clothing');
    await input.fill('sweater');
    await input.clear();
    await expect(input).toHaveValue('');
  });
});
