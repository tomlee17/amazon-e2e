import { Locator, Page } from "@playwright/test";

export class Header {
    readonly search_bar: Locator
    readonly search_button: Locator;
    readonly cart_count: Locator;

    constructor(private readonly page: Page) {
        this.search_bar = page.locator('input[id="twotabsearchtextbox"]');
        this.search_button = page.locator('input[id="nav-search-submit-button"]');
        this.cart_count = page.locator('span[id="nav-cart-count"]');
    }

    async search(item: string) {
        await this.search_bar.click();
        await this.search_bar.fill(item);
        await this.search_button.click();
        await this.page.waitForLoadState("load");
    }
}