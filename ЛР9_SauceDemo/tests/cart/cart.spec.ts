import { test } from "../../src/fixtures/baseTest";

test.describe("@cart", () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test("add one item → badge = 1 → item in cart", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.expectCartBadge(1);

        await inventoryPage.openCart();
        await cartPage.expectOpened();
        await cartPage.expectItemVisible("Sauce Labs Backpack");
        await cartPage.expectItemCount(1);
    });

    test("add two items → badge = 2 → both in cart", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.addItem("Sauce Labs Bike Light");
        await inventoryPage.expectCartBadge(2);

        await inventoryPage.openCart();
        await cartPage.expectOpened();
        await cartPage.expectItemVisible("Sauce Labs Backpack");
        await cartPage.expectItemVisible("Sauce Labs Bike Light");
        await cartPage.expectItemCount(2);
    });

    test("remove item from Inventory → badge updates", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.addItem("Sauce Labs Bike Light");
        await inventoryPage.expectCartBadge(2);

        await inventoryPage.removeItem("Sauce Labs Backpack");
        await inventoryPage.expectCartBadge(1);

        await inventoryPage.openCart();
        await cartPage.expectItemCount(1);
        await cartPage.expectItemVisible("Sauce Labs Bike Light");
    });

    test("remove item from Cart → badge updates", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.addItem("Sauce Labs Bike Light");
        await inventoryPage.expectCartBadge(2);

        await inventoryPage.openCart();
        await cartPage.expectOpened();
        await cartPage.removeItem("Sauce Labs Backpack");
        await cartPage.expectItemCount(1);
        await cartPage.expectItemVisible("Sauce Labs Bike Light");
    });

    test("continue Shopping returns to Inventory", async ({ inventoryPage, cartPage, page }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.openCart();
        await cartPage.expectOpened();

        await cartPage.continueShopping();
        await inventoryPage.expectOpened();
        await inventoryPage.expectCartBadge(1);
    });

    test("button changes from Add to cart to Remove after adding", async ({ inventoryPage }) => {
        const item = inventoryPage.itemByName("Sauce Labs Backpack");
        const addButton = item.locator('[data-test^="add-to-cart-"]');
        await addButton.click();

        const removeButton = item.locator('[data-test^="remove-"]');
        await removeButton.isVisible();
    });

    test("badge disappears after removing last item from cart", async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.expectCartBadge(1);

        await inventoryPage.openCart();
        await cartPage.removeItem("Sauce Labs Backpack");
        await inventoryPage.expectCartBadgeHidden();
    });
});
