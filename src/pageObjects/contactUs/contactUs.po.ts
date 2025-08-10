import { BasePage } from '../basePage';
import { FrameLocator, Locator } from '@playwright/test';
import { ContactForm } from './contactForm.po';

export class ContactUs extends BasePage {
    private readonly pageHeading: string = 'h1[class*=heading-title]';
    private readonly contactFormFrame: string = "iframe[src*='forms.zohopublic.com']";
    private readonly formHeading: string = 'h2[class*=heading-title]';

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForURL('/contact/');
    }

    async contactUsPageTitle(): Promise<Locator> {
        return this.page.locator(this.formHeading).first();
    }

    async contactUsFrameContent(): Promise<FrameLocator> {
        return this.page.frameLocator(this.contactFormFrame).first();
    }

    async pageTitle(): Promise<Locator> {
        return this.page.locator(this.pageHeading).first();
    }

    async contactUsForm(): Promise<ContactForm> {
        const contactForm = await this.contactUsFrameContent();
        return new ContactForm(this.page, contactForm);
    }
}
