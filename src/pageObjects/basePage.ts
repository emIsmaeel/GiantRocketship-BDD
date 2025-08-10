import { Page } from '@playwright/test';
import { Timeout } from '../utils/enums';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async setViewPort(width = 1600, height = 720): Promise<void> {
        await this.page.setViewportSize({ width: width, height: height });
    }

    async waitForReadiness(number = Timeout.THREE_SECONDS): Promise<void> {
        return this.page.waitForTimeout(number);
    }
}
