import { expect, type Locator, type Page } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly root: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator("#header_container");
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    get title(): Locator {
        return this.root.locator(".app_logo");
    }

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async expectTitle(expected: string): Promise<void> {
        await expect(this.title).toHaveText(expected);
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async expectCartBadge(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async expectCartBadgeVisible(): Promise<void> {
        await expect(this.cartBadge).toBeVisible();
    }

    async expectCartBadgeHidden(): Promise<void> {
        await expect(this.cartBadge).toBeHidden();
    }
}