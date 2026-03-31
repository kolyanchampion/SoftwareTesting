import { test, expect } from '@playwright/test';

test('JavaScript Alerts - handle confirm dialog', async ({ page }) => {
  await page.goto('/javascript_alerts');

  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  await page.click('button:has-text("Click for JS Confirm")');
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});
