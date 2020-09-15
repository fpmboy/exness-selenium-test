import {Page, PageType} from './page'
import {NewAccountPage} from "./new.account.page";
import {ArchivedAccount} from '../elements/archived.account.element';
import {DemoAccount} from '../elements/demo.account.element';
import {AccountUser} from '../../config/config';


const enum selector {
    formAccounts = `[name="accountsContainer"]`,
    selectorSort = `#account_sort_select`,
    togglerView = `[data-walkthrough="accountListMode"]`,
    btnNewAccount = `[data-test="accounts-open-new-account-btn"]`,
    containerListAccounts = `[data-test="accounts-page-active-accounts-section"]`,
    demoTab = `[class*=Tabs_container]`,
    archivedTab = `[class*=Tabs_container]`
}
const uri = '/pa/';

export class AccountsPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */
    get formAccounts() {
        return $(selector.formAccounts);
    }

    get selectorSort() {
        return this.formAccounts.$(selector.selectorSort);
    }

    get togglerView() {
        return this.formAccounts.$(selector.togglerView);
    }

    get buttonNewAccount() {
        return this.formAccounts.$(selector.btnNewAccount);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    openNewAccount(accToCreate: AccountUser) {
        this.buttonNewAccount.click();
        new NewAccountPage().createDemo(accToCreate);
        return this
    }

    private getAccount(titleAccount: string): WebdriverIO.Element {
        let elementToFind = null;
        //get list of elements aka accounts
        let listArchived = this.formAccounts.$(selector.containerListAccounts).$$('./div');
        //iterate throw list and find which matches titleAccount
        listArchived.forEach((elem) => {
            if (elem.$('./div[2]').getText().includes(titleAccount)) {
                elementToFind = elem;
            }
        });
        return elementToFind;
    }

    getDemo(account: AccountUser): DemoAccount {
        this.formAccounts.$(selector.demoTab).$('./div[2]').click();
        return new DemoAccount(this.getAccount(account.title));
    }

    getArchived(account: AccountUser): ArchivedAccount {
        this.formAccounts.$(selector.archivedTab).$('./div[3]').click();
        return new ArchivedAccount(this.getAccount(account.title));
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
        return super.open(uri);
    }
}