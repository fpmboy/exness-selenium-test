import {Page, PageType} from './page'
import {NewAccountPage} from "./new.account.page";
import {ArchivedAccount} from '../pageElements/archived.account.element';
import {DemoAccount} from '../pageElements/demo.account.element';
import {AccountUser} from '../config/config';

export class AccountsPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */
    get formAccounts() {
        return $(`[name="accountsContainer"]`);
    }

    get selectorSort() {
        return this.formAccounts.$(`#account_sort_select`);
    }

    get togglerView() {
        return this.formAccounts.$(`[data-walkthrough="accountListMode"]`);
    }

    get buttonNewAccount() {
        return this.formAccounts.$(`[data-test="accounts-open-new-account-btn"]`);
    }
    /**
     * a methods to encapsulate automation code to interact with the page
     */

    openNewAccount(accToCreate: AccountUser) {
        this.buttonNewAccount.click();
        let newAccountPage = new NewAccountPage();
        newAccountPage.c
    }

    private getAccount(titleAccount: string): WebdriverIO.Element {
        let elementToFind = null;
        //get list of elements aka accounts
        let listArchived = this.formAccounts.$(`[data-test="accounts-page-active-accounts-section"]`).$$('./div');
        //iterate throw list and find which matches titleAccount
        listArchived.forEach((elem) => {
            if (elem.$('./div[2]').getText().includes(titleAccount)) {
                elementToFind = elem;
            }
        });
        return elementToFind;
    }

    //bad fast selectors. Can be xpath with partial matching attribute name, but slow.
    getArchived(titleAccount: string): ArchivedAccount {
        this.formAccounts.$(`./div[2]/div[3]`).click();
        return new ArchivedAccount(this.getAccount(titleAccount));
    }

    getDemo(titleAccount: string): DemoAccount {
        this.formAccounts.$(`./div[2]/div[2]`).click();
        return new DemoAccount(this.getAccount(titleAccount));
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = PageType.AccountsPage;

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formAccounts.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return ( this.waitOpened(options)
            && this.formAccounts.waitForDisplayed(options)
            && this.selectorSort.waitForDisplayed(options)
            && this.togglerView.waitForDisplayed(options)
            && this.buttonNewAccount.waitForDisplayed(options));
    }

    open (): Page {
        return super.open('pa/');
    }
}