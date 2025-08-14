import { BasePage } from '../basePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
    private readonly contactMenu: string = '[class$="parent"]:has-text("Contact")';
    private readonly contactUs: string = '[href$="contact"]';

    async openContactMenu(): Promise<void> {
        await this.page.locator(this.contactMenu).first().click();
        await this.page.locator(this.contactMenu).first().hover();
    }

    async clickContactUs(): Promise<void> {
        await this.page.locator(this.contactUs).first().click();
    }
}
