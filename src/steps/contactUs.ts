// steps/contactUs.steps.ts
import { Given, When, Then} from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { formError, successTestData } from '../testData/contactUs/contactTestData';
import type { HomePage } from '../pageObjects/home/home.po';
import type { ContactUs } from '../pageObjects/contactUs/contactUs.po';
import type { SuccessPage } from '../pageObjects/contactUs/success.po';

type Fixtures = {
  homePage: HomePage;
  contactUsPage: ContactUs;
  successPage: SuccessPage;
};

Given('I am on the Contact Us page', async ({ homePage }: Fixtures) => {
  await homePage.visit(process.env.BASE_URL as string);
  await homePage.openContactMenu();
  await homePage.clickContactUs();
});

When('I submit the form {string}', async ({ contactUsPage }: Fixtures, formState: string) => {
  const contactForm = await contactUsPage.contactUsForm();

  if (formState !== 'without filling any fields' && formState !== 'with filled data') {
    throw new Error(`Invalid form state: "${formState}".`);
  }
  await contactForm.submitForm();
});

When(
  'I enter the first name {string} and last name {string}',
  async ({ contactUsPage }: Fixtures, firstName: string, lastName: string) => {
    const contactForm = await contactUsPage.contactUsForm();
    await contactForm.addFirstName(firstName);
    await contactForm.addLastName(lastName);
  }
);

When(
  'I enter the first name {string}, last name {string}, email {string}, and comment {string}',
  async ({ contactUsPage }: Fixtures, firstName: string, lastName: string, email: string, comment: string) => {
    const contactForm = await contactUsPage.contactUsForm();
    await contactForm.addFirstName(firstName);
    await contactForm.addLastName(lastName);
    await contactForm.addEmail(email);
    await contactForm.addComment(comment);
  }
);

Then('I should see error messages for all required fields', async ({ contactUsPage }: Fixtures) => {
  const contactForm = await contactUsPage.contactUsForm();

  expect(await contactForm.firstNameError(formError.error)).toBeVisible();
  expect(await contactForm.emailError(formError.error)).toBeVisible();
  expect(await contactForm.lastNameError(formError.error)).toBeVisible();

  expect(await contactForm.firstNameError(formError.error)).toContainText(formError.error);
  expect(await contactForm.emailError(formError.error)).toContainText(formError.error);
  expect(await contactForm.lastNameError(formError.error)).toContainText(formError.error);
});

Then('I should see error messages for the required fields: email and comment', async ({ contactUsPage }: Fixtures) => {
  const contactForm = await contactUsPage.contactUsForm();

  expect(await contactForm.firstNameError(formError.error)).toBeHidden();
  expect(await contactForm.emailError(formError.error)).toBeVisible();
  expect(await contactForm.lastNameError(formError.error)).toBeHidden();

  expect(await contactForm.emailError(formError.error)).toContainText(formError.error);
});

Then('I should not see any error', async ({ contactUsPage, successPage }: Fixtures) => {
  const contactForm = await contactUsPage.contactUsForm();

  expect(await contactForm.firstNameError(formError.error)).toBeHidden();
  expect(await contactForm.emailError(formError.error)).toBeHidden();
  expect(await contactForm.lastNameError(formError.error)).toBeHidden();
  await successPage.waitForReadiness();
  expect(await successPage.successMessage()).toContainText(successTestData.successMessage);
});
