import { Locator, Page } from "@playwright/test";

export class SearchResultsPage {
    readonly brand_filter_list: Locator;
    readonly filtered_products_links: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.brand_filter_list = page.locator('div[id="brandsRefinements"]');
        this.filtered_products_links = page.locator('div:has-text("Add to cart")');
    }

    async filterByBrand(brand: string) {
        const expand_button = this.brand_filter_list.locator('a:has-text("See more")');

        if (await expand_button.count()) {
            await expand_button.click();
        }

        const brand_checkbox = this.brand_filter_list.locator(`li a:has-text("${brand}") i`);
        await brand_checkbox.click();
    }

    async selectFirstProductOf(brand: string) {
        const nth_product_link = this.filtered_products_links.locator(`div.sg-col-inner a span:has-text("${brand}")`).first();
        await nth_product_link.click();
    }
}