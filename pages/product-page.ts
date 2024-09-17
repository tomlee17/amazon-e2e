import { Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly productTitle: Locator;
    readonly quantityDropdown: Locator;
    readonly addCartButton: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.productTitle = page.locator('span[id="productTitle"]');
        this.quantityDropdown = page.locator('div[id="selectQuantity"]');
        this.addCartButton = page.locator('input[id="add-to-cart-button"]')
    }

    async addToCart(quantity: number) {
        await this.quantityDropdown.click();
        const quantity_select = this.page.locator(`ul li[role="option"] > a:text-is("${quantity}")`);
        await quantity_select.click();
        await this.addCartButton.click();
    }

}