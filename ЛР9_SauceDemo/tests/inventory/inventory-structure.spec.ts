import { test } from "../../src/fixtures/baseTest";

test("inventory: page structure is correct", async ({ inventoryPage }) => {
    await inventoryPage.open()
    await inventoryPage.expectStructure();
});