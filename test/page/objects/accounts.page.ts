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

    get notifyEmptyList() {
        return $(selector.notifyEmptyList);
    }

    get alert() {
        return $(selector.alert);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    private getAccount(titleAccount: string): WebdriverIO.Element {
        this.listAccounts.waitForEnabled();
        let elementToFind = this.listAccounts.$$('./div').filter(
            el => el.getText().includes(titleAccount));
        return elementToFind.pop();
    }

    openNewDemo(accToCreate: AccountUser) {
        this.buttonNewAccount.click();
        new NewAccountPage().createDemo(accToCreate);
        this.formAccounts.waitUntil(() => this.getAccount(accToCreate.title) !== undefined,
            {
                timeout: 15000,
                interval: 1000,
                timeoutMsg: `New Demo ${accToCreate.type + accToCreate.title} should appear in 15! sec`
            }
        );
        this.alert.waitForExist({timeout: 10000, interval: 1000, reverse: true});
    }

    getDemo(account: AccountUser): DemoAccount {
        this.tabDemo.click();
        this.switchListView();
        let accountUser = null;
        if (this.notifyEmptyList.getText().length == 0) {
            this.listAccounts.waitForDisplayed({timeout: 7000, interval: 1000});
            accountUser = this.getAccount(account.title);

        }
        return new DemoAccount(accountUser);
    }

    getArchived(account: AccountUser): ArchivedAccount {
        this.tabArchived.click();
        this.switchListView();
        this.listAccounts.waitForDisplayed({timeout: 7000, interval: 1000});
        return new ArchivedAccount(this.getAccount(account.title));
    }

    switchListView() {
        this.togglerView.$('./div[2]').click();
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = PageType.AccountsPage;

    waitOpened(options?: WebdriverIO.WaitForOptions) {
        this.formAccounts.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions) {
        this.waitOpened(options);
        this.formAccounts.waitForDisplayed(options)
        this.selectorSort.waitForDisplayed(options)
        this.togglerView.waitForDisplayed(options)
        this.buttonNewAccount.waitForDisplayed(options);
    }

    open (): Page {
        return super.open(selector.uri);
    }
}