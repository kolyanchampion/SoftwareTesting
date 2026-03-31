import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    override readonly url: string = "/cart.html";

    readonly container: Locator;
    readonly title: Locator;
    readonly items: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.container = page.locator('[data-test="cart-contents-container"]');
        this.title = page.locator('[data-test="title"]');
        this.items = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    itemByName(name: string): Locator {
        return this.items
            .filter({ has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }) })
            .first();
    }

    async expectOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/cart\.html$/);
        await expect(this.container).toBeVisible();
        await expect(this.title).toHaveText("Your Cart");
    }

    async expectItemVisible(name: string): Promise<void> {
        await expect(this.itemByName(name)).toBeVisible();
    }

    async expectItemCount(count: number): Promise<void> {
        await expect(this.items).toHaveCount(count);
    }

    async removeItem(name: string): Promise<void> {
        const item = this.itemByName(name);
        await item.locator('[data-test^="remove-"]').click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
