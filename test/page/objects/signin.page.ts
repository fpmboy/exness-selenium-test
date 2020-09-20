import { Page, PageType } from './page'
import { pageSignIn as selector } from '../layout/desktop'

export class SignInPage extends Page {

    /**
     * all selectors are used in this sections throw getters
     */
    get formSignIn() {
        return $(selector.formSignIn);
    }

    get inputLogin() {
        return $(selector.inputLogin);
    }

    get inputPassword() {
        return $(selector.inputPassword);
    }

    get btnSubmit() {
        return $(selector.btnSubmit);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    login (login: string, password: string) {
        this.inputLogin.setValue(login);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = PageType.SignInPage;

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formSignIn.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.formSignIn.waitForDisplayed(options)
            && this.inputLogin.waitForDisplayed(options)
            && this.inputPassword.waitForDisplayed(options)
            && this.btnSubmit.waitForDisplayed(options));
    }

    open (): Page {
        return super.open(selector.uri);
    }
}