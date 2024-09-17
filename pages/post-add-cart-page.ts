import { Locator, Page } from "@playwright/test";
import { Header } from "./components/header";

export class postAddCartPage {
    readonly header: Header;

    readonly addedToCartHeading: Locator;
    readonly proceedCheckoutButton: Locator;
    readonly sideDeleteButton: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.header = new Header(page);
        this.addedToCartHeading = page.locator('h1:text-is("Added to Cart")');
        this.proceedCheckoutButton = page.locator('div[data-feature-id="proceed-to-checkout-label"]:has-text("Proceed to Checkout")');
        this.sideDeleteButton = page.locator('div.ewc-delete-icon-container button')
    }

    async removeProduct() {
        await this.sideDeleteButton.click();
    }
}