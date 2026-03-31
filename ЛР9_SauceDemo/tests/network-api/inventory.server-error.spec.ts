import { expect, test } from "../../src/fixtures/baseTest";

test("network: mock 500 error from backend", async ({ page }) => {
    await page.route("**/api/inventory-items*", async (route) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "Internal Server Error (mocked)" }),
        });
    });

    await page.goto("/inventory.html");

    // В залежності від UI SauceDemo: або 0 items, або сторінка частково рендериться
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);

    // (Опційно) можна перевірити, що не впала навігація/хедер
    await expect(page.locator("#header_container")).toBeVisible();
});