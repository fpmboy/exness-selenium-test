import { Page, PageType } from './page'
import { NewAccountPage } from './new.account.page';
import { ArchivedAccount } from '../elements/archived.account.element';
import { DemoAccount } from '../elements/demo.account.element';
import { AccountUser } from '../../config/config';
import { pageAccounts as selector } from "../layout/desktop";

export class AccountsPage extends Page {

    /**
     * all selectors are used in this sections throw getters
     */
    get formAccounts() {
        return $(selector.formAccounts);
    }

    get loaderBusy() {
        return $(selector.loaderBusy);
    }

    get selectorSort() {
        return $(selector.selectorSort);
    }

    get selectorNewestSort() {
        return $(selector.selectorNewestSort);
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

    get notifyEmptyList() {
        return $(selector.notifyEmptyList);
    }

    get alertCloseButton() {
        return $(selector.alertCloseButton);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    switchGridView(options?: WebdriverIO.WaitForOptions) {
        this.togglerView.waitForClickable(options);
        this.togglerView.$(selector.togglerGridView).click();
    }

    switchListView(options?: WebdriverIO.WaitForOptions) {
        this.togglerView.waitForClickable(options);
        this.togglerView.$(selector.togglerListView).click();
    }

    switchNewestSort(options?: WebdriverIO.WaitForOptions) {
        this.selectorSort.waitForDisplayed(options);
        this.selectorSort.click();
        this.loaderBusy.waitForDisplayed({ timeout: 5000, reverse: true});
        this.selectorNewestSort.waitForDisplayed(options);
        this.selectorNewestSort.click();
    }

    private getAccount(account: AccountUser): WebdriverIO.Element {
        if (this.notifyEmptyList.getText().length == 0) {
            let elementToFind = this.listAccounts.$$('./div').filter(
                el => el.getText().includes(account.title));
            return elementToFind.pop();
        }
        return undefined;
    }

    openNewDemo(accToCreate: AccountUser) {
        this.buttonNewAccount.click();
        new NewAccountPage().createDemo(accToCreate);
        this.formAccounts.waitUntil(() => this.getAccount(accToCreate) !== undefined,
            {
                timeout: 15000,
                interval: 1000,
                timeoutMsg: `New Demo ${accToCreate.type + accToCreate.title} should appear in 15! sec`
            }
        );
    }

    getDemo(account: AccountUser): DemoAccount {
        return new DemoAccount(this.getAccount(account));
    }

    getArchived(account: AccountUser): ArchivedAccount {
        return new ArchivedAccount(this.getAccount(account));
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = PageType.AccountsPage;

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formAccounts.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.formAccounts.waitForDisplayed(options)
            && this.selectorSort.waitForDisplayed(options)
            && this.togglerView.waitForDisplayed(options)
            && this.buttonNewAccount.waitForDisplayed(options));
    }

    open (): Page {
        return super.open(selector.uri);
    }
}