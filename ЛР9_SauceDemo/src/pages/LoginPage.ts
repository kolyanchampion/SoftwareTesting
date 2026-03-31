import { expect, type Locator, type Page } from "@playwright/test";
import type { SauceUser } from "../fixtures/baseTest";

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly errorBox: Locator;

    constructor(page: Page) {
        this.page = page;

        // Prefer data-test selectors on SauceDemo
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');

        this.errorBox = page.locator('[data-test="error"]');
    }

    async open(): Promise<void> {
        // baseURL should be configured in playwright.config.ts
        await this.page.goto("/");
        await expect(this.loginButton).toBeVisible();
    }

    async login(user: SauceUser): Promise<void> {
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }

    async expectErrorContains(text: string): Promise<void> {
        await expect(this.errorBox).toContainText(text);
    }
}