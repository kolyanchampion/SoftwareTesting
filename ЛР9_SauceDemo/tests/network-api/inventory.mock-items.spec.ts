import { expect, test } from "../../src/fixtures/baseTest";

test("network: mock inventory items via route.fulfill", async ({ page }) => {
    await page.route("**/api/inventory-items*", async (route) => {
        const mocked = {
            inventory: [
                {
                    id: 999,
                    name: "Vlad's Ultra Backpack",
                    desc: "Mocked item for Playwright lecture 😄",
                    price: 1337,
                    image_url: "/static/media/sauce-backpack-1200x1500.34e7aa42.jpg",
                },
            ],
        };

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mocked),
            headers: {
                "access-control-allow-origin": "*",
            },
        });
    });

    await page.goto("/inventory.html");

    // Перевіряємо що UI показує наш мок-товар
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Vlad's Ultra Backpack");
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText("1337");
});