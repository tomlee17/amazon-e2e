import { Locator, Page } from "@playwright/test";
import { Header } from "./components/header";

export class PostAddCartPage {
    readonly header: Header;

    readonly added_to_cart_heading: Locator;
    readonly proceed_checkout_button: Locator;
    readonly decrease_qty_button: Locator;

    constructor(
        private readonly page: Page,
    ) {
        this.header = new Header(page);
        this.added_to_cart_heading = page.locator('h1:text("Added to cart")');
        this.proceed_checkout_button = page.locator('div[data-feature-id="proceed-to-checkout-label"]:has-text("Proceed to Checkout")');
        this.decrease_qty_button = page.getByLabel(/Decrease|Delete/i);
    }

    async removeProduct() {
        const qty_display = this.page.getByRole("spinbutton");

        while(true) {
            const curr_qty = await qty_display.innerText();
            await this.decrease_qty_button.click();

            if (curr_qty === "1") { return; } // If the quantity was 1, we have already removed the product

            const updated_qty_display = qty_display.getByText((parseInt(curr_qty) - 1).toString());
            await updated_qty_display.waitFor();
        } 
    }
}