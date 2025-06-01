import { expect, Locator, Page } from "@playwright/test";

export class SearchResultsPage {
    readonly brand_filter_list: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.brand_filter_list = page.locator('div[id="brandsRefinements"]');;
    }

    get current_search_results(): Locator {
        return this.page.locator("div[role='listitem']");
    }

    async filterByBrand(brand: string) {
        const expand_button = this.brand_filter_list.locator('a:has-text("See more")');

        if (await expand_button.count()) {
            await expand_button.click();
        }

        const brand_checkbox = this.brand_filter_list.locator(`li a:has-text("${brand}") i`);
        await brand_checkbox.click();
    }

    async selectProductOf(brand: string, strategy: ProductSelectionStrategy) {
        const target_product_link = strategy.selectFrom(this.current_search_results, brand);
        await expect(target_product_link).toBeVisible();
        await target_product_link.click();
    }
}

interface ProductSelectionStrategy {
    selectFrom(product: Locator, brand: string): Locator;
}

export class FirstAvailableProductStrategy implements ProductSelectionStrategy {
    selectFrom(products: Locator, brand: string): Locator {
        return products
                .locator(':scope:has(button:has-text("Add to cart"))')
                .getByRole("link", { name: brand })
                .first();
    }
}

export class FirstUnavailableProductStrategy implements ProductSelectionStrategy {
    selectFrom(products: Locator, brand: string): Locator {
        return products
                .locator(':scope:not(:has(button:has-text("Add to cart")))')
                .getByRole("link", { name: brand })
                .first();
    }
}