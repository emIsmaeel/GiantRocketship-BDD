import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { chromium, Browser, BrowserContext } from 'playwright';
import { HomePage } from '../pageObjects/home/home.po';
import { ContactUs } from '../pageObjects/contactUs/contactUs.po';
import { SuccessPage } from '../pageObjects/contactUs/success.po';
import { ENV } from '../utils/env';

interface CustomWorldParams {
  parameters?: Record<string, unknown>;
}

export class CustomWorld extends World<CustomWorldParams> {
  page!: Page;
  browser!: Browser;
  context!: BrowserContext;
  homePage!: HomePage;
  contactUsPage!: ContactUs;
  successPage!: SuccessPage;

  constructor(options: IWorldOptions<CustomWorldParams>) {
    super(options);
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: Boolean(ENV.CI || ENV.HEADLESS),
    });

    this.context = await this.browser.newContext({
      baseURL: ENV.BASE_URL,
    });

    this.page = await this.context.newPage();

    this.homePage = new HomePage(this.page);
    this.contactUsPage = new ContactUs(this.page);
    this.successPage = new SuccessPage(this.page);
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
