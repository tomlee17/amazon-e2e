import { Locator, Page } from "@playwright/test";

export class Header {
    readonly searchBar: Locator
    readonly searchButton: Locator;
    readonly cartCount: Locator;

    constructor(readonly page: Page) {
        this.searchBar = page.locator('input[id="twotabsearchtextbox"]');
        this.searchButton = page.locator('input[id="nav-search-submit-button"]');
        this.cartCount = page.locator('span[id="nav-cart-count"]');
    }

    async search(item: string) {
        await this.searchBar.click();
        await this.searchBar.fill(item);
        await this.searchButton.click();
        await this.page.waitForLoadState("load");
    }
}