import { Given, When, Then } from '../fixtures/fixtures';
import { ContactForm } from '../pageObjects/contactUs/contactForm.po';
import { expect } from '@playwright/test';
import { formError, successTestData } from '../testData/contactUs/contactTestData';
import { headerTestData } from "../testData/home/homeTestData";

let contactForm: ContactForm;

Given('I am on the Contact Us page', async ({ homePage }) => {
    await homePage.visit(process.env.BASE_URL);
    const header = await homePage.getHeader();
    await header.openMenu(headerTestData.contact);
    await header.openSubMenu(headerTestData.contactUs);
});

When('I submit the form {string}', async ({ contactUsPage }, formState: string) => {
    contactForm = await contactUsPage.contactUsForm();

    if (formState !== 'without filling any fields' && formState !== 'with filled data') {
        throw new Error(`Invalid form state: "${formState}".`);
    }
    await contactForm.submitForm();
});

When(
    'I enter the first name {string} and last name {string}',
    async ({ contactUsPage }, firstName: string, lastName: string) => {
        contactForm = await contactUsPage.contactUsForm();
        await contactForm.addFirstName(firstName);
        await contactForm.addLastName(lastName);
    },
);

When(
    'I enter the first name {string}, last name {string}, and email {string}',
    async ({ contactUsPage }, firstName: string, lastName: string, email: string) => {
        contactForm = await contactUsPage.contactUsForm();
        await contactForm.addFirstName(firstName);
        await contactForm.addLastName(lastName);
        await contactForm.addEmail(email);
    },
);

When(
    'I enter the first name {string}, last name {string}, email {string}, and comment {string}',
    async ({ contactUsPage }, firstName: string, lastName: string, email: string, comment: string) => {
        contactForm = await contactUsPage.contactUsForm();
        await contactForm.addFirstName(firstName);
        await contactForm.addLastName(lastName);
        await contactForm.addEmail(email);
        await contactForm.addComment(comment);
    },
);

Then('I should see error messages for all required fields', async () => {
    await Promise.all([
        expect(await contactForm.nameError()).toBeVisible(),
        expect(await contactForm.emailError()).toBeVisible(),
        expect(await contactForm.commentError()).toBeVisible(),
        expect(await contactForm.nameError()).toContainText(formError.error),
        expect(await contactForm.emailError()).toContainText(formError.error),
        expect(await contactForm.commentError()).toContainText(formError.error),
    ]);
});

Then('I should see error messages for the required fields: email and comment', async () => {
    await Promise.all([
        expect(await contactForm.nameError()).toBeHidden(),
        expect(await contactForm.emailError()).toBeVisible(),
        expect(await contactForm.commentError()).toBeVisible(),
        expect(await contactForm.emailError()).toContainText(formError.error),
        expect(await contactForm.commentError()).toContainText(formError.error),
    ]);
});

Then('I should see an error message for the required field: comment', async () => {
    await Promise.all([
        expect(await contactForm.nameError()).toBeHidden(),
        expect(await contactForm.emailError()).toBeHidden(),
        expect(await contactForm.commentError()).toBeVisible(),
        expect(await contactForm.commentError()).toContainText(formError.error),
    ]);
});

Then('I should see a success message indicating the form was submitted successfully', async ({ successPage }) => {
    await successPage.waitForFormSubmit();
    await Promise.all([
        expect(await contactForm.nameError()).toBeHidden(),
        expect(await contactForm.emailError()).toBeHidden(),
        expect(await contactForm.commentError()).toBeHidden(),
        expect(await successPage.successPageTitle()).toContainText(successTestData.thankYou),
        expect(await successPage.successMessage()).toContainText(successTestData.successMessage),
    ]);
});
