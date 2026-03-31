import { test } from "../../src/fixtures/baseTest";

const STORAGE_STATE_PATH = "storage/auth.json";

test("auth: save storageState", async ({ page, loginPage, inventoryPage, user }) => {
    await loginPage.open();
    await loginPage.login(user);

    await inventoryPage.expectOpened();

    await page.context().storageState({ path: STORAGE_STATE_PATH });
});