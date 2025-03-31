import { Locator, Page } from "@playwright/test";
import { setTimeout as sleep } from "timers/promises";

export class ProductPage {
    readonly product_title: Locator;
    readonly quantity_dropdown: Locator;
    readonly add_cart_button: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.product_title = page.locator('span[id="productTitle"]');
        this.quantity_dropdown = page.locator('div[id="selectQuantity"]');
        this.add_cart_button = page.locator('input[id="add-to-cart-button"]')
    }

    async addToCart(quantity: number) {
        await this.quantity_dropdown.click();
        const quantity_select = this.page.locator(`ul li[role="option"] > a:text-is("${quantity}")`);
        // This is flaky but for some reason the click on the quantity select is not working
        // if we don't wait for a bit before clicking it
        // Even waiting for the quantity select to be visible and stable is not enough
        // This is a workaround, but it should be fixed in the future
        await sleep(1000);
        await quantity_select.click();
        await this.add_cart_button.click();
    }

}