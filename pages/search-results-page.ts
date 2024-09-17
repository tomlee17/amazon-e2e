import { Locator, Page } from "@playwright/test";

export class SearchResultsPage {
    readonly brandFilterList: Locator;
    readonly filteredProductsLinks: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.brandFilterList = page.locator('div[id="brandsRefinements"]');
        this.filteredProductsLinks = page.locator('div:has-text("Add to cart")');
    }

    async filterByBrand(brand: string) {
        const expand_button = this.brandFilterList.locator('a:has-text("See more")');

        if (await expand_button.count()) {
            await expand_button.click();
        }

        const brand_checkbox = this.brandFilterList.locator(`li[aria-label="${brand}"] i`);
        await brand_checkbox.click();
    }

    async selectFirstProductOf(brand: string) {
        const nth_product_link = this.filteredProductsLinks.locator(`div.sg-col-inner a span:has-text("${brand}")`).first();
        await nth_product_link.click();
    }
}