import { BasePage } from '../basePage';
import { ContactForm } from './contactForm.po';

export class ContactUs extends BasePage {

    async contactUsForm(): Promise<ContactForm> {
        return new ContactForm(this.page);
    }
}
