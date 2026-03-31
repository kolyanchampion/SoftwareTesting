import type { Page } from "@playwright/test";
import { Response } from "playwright-core";

export abstract class BasePage {
    readonly url: string;
    readonly page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    open(): Promise<Response | null> {
        return this.page.goto(this.url);
    }
}