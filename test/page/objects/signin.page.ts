import { Page, PageType } from './page'
import { AccountsPage } from './accounts.page'

const enum selector {
    formSignIn = `<signin-form>`,
    inputLogin = `#login`,
    inputPassword = `#password`,
    btnSubmit = `button[type="submit"]`
}
const uri = '/accounts/sign-in';

export class SignInPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */
    get formSignIn() {
        return $(selector.formSignIn);
    }

    get inputLogin() {
        return this.formSignIn.$(selector.inputLogin);
    }

    get inputPassword() {
        return this.formSignIn.$(selector.inputPassword);
    }

    get btnSubmit() {
        return this.formSignIn.$(selector.btnSubmit);
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
        return super.open(uri);
    }
}