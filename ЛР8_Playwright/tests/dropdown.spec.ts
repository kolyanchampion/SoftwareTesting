import { test, expect } from '@playwright/test';

test('Dropdown - select option by value', async ({ page }) => {
  await page.goto('/dropdown');
  await page.selectOption('#dropdown', '2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
});
