import { expect, test } from "../../src/fixtures/baseTest";

test("inventory page visual snapshot", async ({ page, inventoryPage }) => {
    await inventoryPage.open();

    await expect(page).toHaveScreenshot("inventory.png", {
        fullPage: true,
    });
});