import { Page } from "@playwright/test";
import { Header } from "./components/header";

export class MainPage {
    readonly header: Header;

    readonly url: string = "https://www.amazon.sg/";

    constructor(
        private readonly page: Page,
    ) {
        this.header = new Header(page);
    }

    async goToUrl() {
        await this.page.goto(this.url);
    }

    async search(item: string) {
        await this.header.search(item);
    }
}