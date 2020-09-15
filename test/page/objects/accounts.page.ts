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
    tabList = `[class*=Tabs_container]`,
    tabDemo = `./div[2]`,
    tabArchived = `./div[3]`
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
        return $(selector.selectorSort);
    }

    get togglerView() {
        return $(selector.togglerView);
    }

    get buttonNewAccount() {
        return $(selector.btnNewAccount);
    }

    get tabList() {
        return $(selector.tabList);
    }

    get listAccounts() {
        return $(selector.containerListAccounts);
    }

    get tabDemo() {
        return this.tabList.$(selector.tabDemo);
    }

    get tabArchived() {
        return this.tabList.$(selector.tabArchived);
    }
    /**
     * a methods to encapsulate automation code to interact with the page
     */
    private getAccount(titleAccount: string): WebdriverIO.Element {
        let elementToFind = this.listAccounts.$$('./div').filter(
            el => el.getText().includes(titleAccount));
        return elementToFind.pop();
    }

    openNewDemo(accToCreate: AccountUser) {
        this.buttonNewAccount.click();
        new NewAccountPage().createDemo(accToCreate);
        this.formAccounts.waitUntil(() => this.getAccount(accToCreate.title) !== undefined,
            {
                timeout: 10000,
                interval: 1000,
                timeoutMsg: `New Demo ${accToCreate.type + accToCreate.title} should appear in 10! sec`
            }
        );
    }

    getDemo(account: AccountUser): DemoAccount {
        this.tabDemo.click();
        this.listAccounts.waitForEnabled();
        return new DemoAccount(this.getAccount(account.title));
    }

    getArchived(account: AccountUser): ArchivedAccount {
        this.tabArchived.click();
        this.listAccounts.waitForEnabled();
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