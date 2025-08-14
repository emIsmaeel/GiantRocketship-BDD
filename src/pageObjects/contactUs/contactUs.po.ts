import { BasePage } from '../basePage';
import { Locator } from '@playwright/test';
import { ContactForm } from './contactForm.po';

export class ContactUs extends BasePage {
    private readonly pageHeading: string = 'h1[class*=heading-title]';
    private readonly formHeading: string = 'h2[class*=heading-title]';

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForURL('/contact/');
    }

    async contactUsPageTitle(): Promise<Locator> {
        return this.page.locator(this.formHeading).first();
    }

    async pageTitle(): Promise<Locator> {
        return this.page.locator(this.pageHeading).first();
    }

    async contactUsForm(): Promise<ContactForm> {
        return new ContactForm(this.page);
    }
}
