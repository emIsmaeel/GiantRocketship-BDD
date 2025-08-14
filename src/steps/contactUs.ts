import { Given, When, Then } from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ContactForm } from '../pageObjects/contactUs/contactForm.po';
import { formError, successTestData } from '../testData/contactUs/contactTestData';
import { CustomWorld } from '../support/world';
setDefaultTimeout(30000);

let contactForm: ContactForm;

Given<CustomWorld>('I am on the Contact Us page', async function () {
    await this.init();
    await this.homePage.visit(process.env.BASE_URL as string);
    await this.homePage.openContactMenu();
    await this.homePage.clickContactUs();
});

When<CustomWorld>('I submit the form {string}', async function (formState: string) {
    contactForm = await this.contactUsPage.contactUsForm();

    if (formState !== 'without filling any fields' && formState !== 'with filled data') {
        throw new Error(`Invalid form state: "${formState}".`);
    }
    await contactForm.submitForm();
});

When<CustomWorld>(
    'I enter the first name {string} and last name {string}',
    async function (firstName: string, lastName: string) {
        contactForm = await this.contactUsPage.contactUsForm();
        await contactForm.addFirstName(firstName);
        await contactForm.addLastName(lastName);
    }
);

When<CustomWorld>(
    'I enter the first name {string}, last name {string}, email {string}, and comment {string}',
    async function (firstName: string, lastName: string, email: string, comment: string) {
        contactForm = await this.contactUsPage.contactUsForm();
        await contactForm.addFirstName(firstName);
        await contactForm.addLastName(lastName);
        await contactForm.addEmail(email);
        await contactForm.addComment(comment);
    }
);

Then('I should see error messages for all required fields', async function () {
    expect(await contactForm.firstNameError(formError.error)).toBeVisible();
    expect(await contactForm.emailError(formError.error)).toBeVisible();
    expect(await contactForm.lastNameError(formError.error)).toBeVisible();
    expect(await contactForm.firstNameError(formError.error)).toContainText(formError.error);
    expect(await contactForm.emailError(formError.error)).toContainText(formError.error);
    expect(await contactForm.lastNameError(formError.error)).toContainText(formError.error);
});

Then('I should see error messages for the required fields: email and comment', async function () {
    expect(await contactForm.firstNameError(formError.error)).toBeHidden();
    expect(await contactForm.emailError(formError.error)).toBeVisible();
    expect(await contactForm.lastNameError(formError.error)).toBeHidden();
    expect(await contactForm.emailError(formError.error)).toContainText(formError.error);
});

Then<CustomWorld>('I should not see any error', async function () {
    // await this.successPage.waitForFormSubmit();
    expect(await contactForm.firstNameError(formError.error)).toBeHidden();
    expect(await contactForm.emailError(formError.error)).toBeHidden();
    expect(await contactForm.lastNameError(formError.error)).toBeHidden();
    expect(await this.successPage.successMessage()).toContainText(successTestData.successMessage);
});
