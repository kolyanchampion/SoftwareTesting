import { test, expect } from "../../src/fixtures/baseTest";

test("offline: requests fail in offline mode", async ({ context, page, inventoryPage }) => {
    await context.setOffline(true);

    const failures: string[] = [];
    page.on("requestfailed", (r) => {
        failures.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText}`);
    });

    await inventoryPage.open().catch(() => null);

    expect(failures.length).toBeGreaterThan(0);
    // На лекції можна вивести failures в console.log, щоб було наочно 🙂
});