import { expect, test } from '@playwright/test';

test.describe('Category Pills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all 6 category pills are visible', async ({ page }) => {
    const exactCategories = ['New Arrivals', 'Sales', 'Brand'];
    const partialCategories = ["Kid's"];
    for (const cat of exactCategories) {
      await expect(page.getByRole('link', { name: cat, exact: true })).toBeVisible();
    }
    // 'Men' and 'Women' need exact matching to avoid substring overlap
    await expect(page.getByRole('link', { name: 'Men', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Women', exact: true })).toBeVisible();
    for (const cat of partialCategories) {
      await expect(page.getByRole('link', { name: cat })).toBeVisible();
    }
  });

  test('"Clothing" dropdown pill is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /clothing/i }).first()).toBeVisible();
  });

  test('clicking "Sales" pill navigates to /collections', async ({ page }) => {
    await page.getByRole('link', { name: /^sales$/i }).click();
    await expect(page).toHaveURL(/\/collections/);
  });

  test('clicking "Men" pill navigates to /collections', async ({ page }) => {
    await page.getByRole('link', { name: /^men$/i }).click();
    await expect(page).toHaveURL(/\/collections/);
  });
});
