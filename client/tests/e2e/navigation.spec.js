import { expect, test } from '@playwright/test';

test.describe('Navigation Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking "About Us" navigates to /about', async ({ page }) => {
    await page.getByRole('link', { name: /about us/i }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByText(/about us page/i)).toBeVisible();
  });

  test('clicking "Blog" navigates to /blog', async ({ page }) => {
    await page.getByRole('link', { name: /blog/i }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.getByText(/blog page/i)).toBeVisible();
  });

  test('clicking "FAQ" navigates to /faq', async ({ page }) => {
    await page.getByRole('link', { name: /^faq$/i }).click();
    await expect(page).toHaveURL(/\/faq/);
    await expect(page.getByText(/faq page/i)).toBeVisible();
  });

  test('clicking SHOPSMART logo returns to home (/)', async ({ page }) => {
    await page.goto('#/about');
    await page.getByText('SHOPSMART').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toContainText('Unleash Your Style');
  });

  test('clicking cart icon navigates to /cart', async ({ page }) => {
    await page.getByRole('link', { name: /cart/i }).click();
    await expect(page).toHaveURL(/\/cart/);
  });

  test('clicking profile icon navigates to /profile', async ({ page }) => {
    await page.getByRole('link', { name: /profile/i }).click();
    await expect(page).toHaveURL(/\/profile/);
  });

  test('clicking "Clothing" category pill navigates to /collections', async ({ page }) => {
    await page.getByRole('link', { name: /clothing/i }).first().click();
    await expect(page).toHaveURL(/\/collections/);
  });

  test('clicking "New Arrivals" pill navigates to /collections', async ({ page }) => {
    await page.getByRole('link', { name: /new arrivals/i }).click();
    await expect(page).toHaveURL(/\/collections/);
  });
});
