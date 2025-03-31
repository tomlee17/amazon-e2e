import { Locator, Page } from "@playwright/test";
import { Header } from "./components/header";

export class postAddCartPage {
    readonly header: Header;

    readonly added_to_cart_heading: Locator;
    readonly proceed_checkout_button: Locator;
    readonly side_delete_button: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.header = new Header(page);
        this.added_to_cart_heading = page.locator('h1:text("Added to cart")');
        this.proceed_checkout_button = page.locator('div[data-feature-id="proceed-to-checkout-label"]:has-text("Proceed to Checkout")');
        this.side_delete_button = page.locator('div.ewc-delete-icon-container button')
    }

    async removeProduct() {
        await this.side_delete_button.click();
    }
}