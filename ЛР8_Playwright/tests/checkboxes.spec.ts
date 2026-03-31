import { test, expect } from '@playwright/test';

test('Checkboxes - toggle checkbox state', async ({ page }) => {
  await page.goto('/checkboxes');
  const checkbox1 = page.locator('input[type="checkbox"]').first();
  const checkbox2 = page.locator('input[type="checkbox"]').last();

  await checkbox1.check();
  await expect(checkbox1).toBeChecked();

  await checkbox2.uncheck();
  await expect(checkbox2).not.toBeChecked();
});
