import { Page, PageType } from './page'
import { AccountsPage } from './accounts.page'

export class SignInPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */
    get formSignIn() {
        return $(`<signin-form>`);
    }

    get inputLogin() {
        return this.formSignIn.$(`#login`);
    }

    get inputPassword() {
        return this.formSignIn.$(`#password`);
    }

    get btnSubmit() {
        return this.formSignIn.$(`button[type="submit"]`);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    login (login: string, password: string) {
        this.inputLogin.setValue(login);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
        return new AccountsPage();
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = PageType.SignInPage;

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formSignIn.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return ( this.waitOpened(options)
            && this.formSignIn.waitForDisplayed(options)
            && this.inputLogin.waitForDisplayed(options)
            && this.inputPassword.waitForDisplayed(options)
            && this.btnSubmit.waitForDisplayed(options));
    }

    open ():Page {
        return super.open('accounts/sign-in');
    }
}