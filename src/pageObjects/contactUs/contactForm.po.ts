import { BasePage } from '../basePage';
import { Locator, Page } from '@playwright/test';

export class ContactForm extends BasePage{
    private readonly firstName: string = '[id^="firstname"]';
    private readonly lastName: string = '[id^="lastname"]';
    private readonly email: string = "[id^='email']";
    private readonly comment: string = "[id^='contact_notes']";
    private readonly submitBtn: string = 'input[value="Submit"]';
    private readonly firstNameFieldError: string = '[class^="hs_firstname"]';
    private readonly lastNameFieldError: string = '[class^="hs_lastname"]';
    private readonly emailFieldError: string = '[class^="hs_email"]';

    constructor(page: Page) {
        super(page);
    }

    async addFirstName(firstName: string): Promise<void> {
        await this.page.locator(this.firstName).first().fill(firstName);
    }

    async addLastName(lastName: string): Promise<void> {
        await this.page.locator(this.lastName).first().fill(lastName);
    }

    async addEmail(email: string): Promise<void> {
        await this.page.locator(this.email).first().fill(email);
    }

    async addComment(comment: string): Promise<void> {
        await this.page.locator(this.comment).first().fill(comment);
    }

    async firstNameError(error:string): Promise<Locator> {
        return this.page.locator(this.firstNameFieldError)
        .filter({ hasText: `${error}` });
    }

    async lastNameError(error:string): Promise<Locator> {
        return this.page.locator(this.lastNameFieldError)
        .filter({ hasText: `${error}` });
    }

    async emailError(error:string): Promise<Locator> {
        return this.page.locator(this.emailFieldError)
        .filter({ hasText: `${error}` });
    }

    async submitForm(): Promise<void> {
        await this.page.locator(this.submitBtn).first().click();
    }
}
