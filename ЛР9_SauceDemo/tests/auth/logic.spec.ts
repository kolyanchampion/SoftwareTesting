import { test } from "../../src/fixtures/baseTest";

test("login: opens inventory (main) page", async ({ loginPage, inventoryPage, user }) => {
    await loginPage.open();
    await loginPage.login({
        ...user,
        password: user.password,
    });

    await inventoryPage.expectOpened();
});