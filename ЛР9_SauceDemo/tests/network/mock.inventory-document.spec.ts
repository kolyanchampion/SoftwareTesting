import { test, expect } from "../../src/fixtures/baseTest";

test("route.fulfill: mock inventory.html document", async ({ page, inventoryPage }) => {
    await page.route("**/inventory.html", async (route) => {
        // Можна також взяти route.fetch() і модифікувати, але для лекції простіше повний mock
        await route.fulfill({
            status: 200,
            contentType: "text/html; charset=utf-8",
            body: `
        <!doctype html>
        <html>
          <head><meta charset="utf-8"><title>Mocked Inventory</title></head>
          <body>
            <h1 data-test="title">Products</h1>
            <div data-test="inventory-container">
              <div data-test="inventory-item">
                <div data-test="inventory-item-name">MOCKED ITEM ✅</div>
                <div data-test="inventory-item-desc">Injected via route.fulfill 😄</div>
                <div data-test="inventory-item-price">$13.37</div>
                <button>Add to cart</button>
              </div>
            </div>
          </body>
        </html>
      `,
        });
    });

    await inventoryPage.open();

    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("MOCKED ITEM ✅");
});