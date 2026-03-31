import { test, expect } from '@playwright/test';

test('Dynamic Loading - wait for hidden element', async ({ page }) => {
  await page.goto('/dynamic_loading/2');
  await page.click('#start button');
  await expect(page.locator('#finish h4')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#finish h4')).toHaveText('Hello World!');
});
