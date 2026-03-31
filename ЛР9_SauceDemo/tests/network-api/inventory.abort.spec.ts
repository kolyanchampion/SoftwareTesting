import { expect, test } from "../../src/fixtures/baseTest";


test("network: abort inventory request (simulate network error)", async ({ page }) => {
    await page.route("**/api/inventory-items*", async (route) => {
        await route.abort("failed"); // можна також: "internetdisconnected"
    });

    await page.goto("/inventory.html");

    // UI може зависнути або показати пустий список — перевіримо що товарів нема
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});