import { test, expect } from "../../src/fixtures/baseTest";

test("network: offline mode blocks requests", async ({ context, page }) => {
    await context.setOffline(true);

    // Якщо ми офлайн — сторінка не зможе завантажитись як треба
    // Але Playwright все одно відкриє документ, якщо він вже закешований — частіше буде error.
    const [requestFailed] = await Promise.all([
        page.waitForEvent("requestfailed").catch(() => null),
        page.goto("/inventory.html").catch(() => null),
    ]);

    // Очікуємо що хоч якийсь request впав
    expect(requestFailed).not.toBeNull();

    // Товарів точно не буде
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});