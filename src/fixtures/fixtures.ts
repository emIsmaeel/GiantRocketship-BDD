import { createBdd, test as base } from 'playwright-bdd';
import { SuccessPage } from '../pageObjects/contactUs/success.po';
import { HomePage } from '../pageObjects/home/home.po';
import { ContactUs } from '../pageObjects/contactUs/contactUs.po';

type BaseFixture = {
    homePage: HomePage;
    contactUsPage: ContactUs;
    successPage: SuccessPage;
};

export const test = base.extend<BaseFixture>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUs(page));
    },
    successPage: async ({ page }, use) => {
        await use(new SuccessPage(page));
    },
});

export const { Given, When, Then } = createBdd(test);
