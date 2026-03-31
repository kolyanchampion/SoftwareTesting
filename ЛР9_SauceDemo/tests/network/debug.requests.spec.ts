import { test } from "../../src/fixtures/baseTest";

test("debug: log requests on inventory page", async ({ page }) => {
    const seen = new Set<string>();

    page.on("request", (r) => {
        const url = r.url();
        const key = `${r.method()} ${url}`;
        if (!seen.has(key)) {
            seen.add(key);
            console.log("[REQ]", key);
        }
    });

    page.on("response", (res) => {
        const url = res.url();
        if (url.includes("inventory") || url.includes("/static/")) {
            console.log("[RES]", res.status(), url);
        }
    });

    await page.goto("/inventory.html");
});