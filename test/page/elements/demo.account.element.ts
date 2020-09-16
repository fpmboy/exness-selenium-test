import { AccountElement, AccountType } from './account.element';
import { elementDemoAccount as selector } from  '../layout/desktop';

export class DemoAccount extends AccountElement<AccountType> {

    /**
     * all selectors are used in this sections throw getters
     */

    get buttonSettings() {
        return this.element.$(selector.buttonSettings);
    }

    get menuList() {
        return this.element.$(selector.menuList);
    }

    get menuArchived() {
        return this.element.$(selector.menuArchive);
    }

    /**
     * a methods to encapsulate automation code to interact with the element
     */
    archive() {
        this.buttonSettings.click();
        this.menuList.waitForDisplayed();
        this.menuArchived.click();
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = AccountType.Demo;

    constructor(protected _wdioElement: WebdriverIO.Element) {
        super(_wdioElement);
    }

    get elementType() {
        return DemoAccount.type;
    }

    get element(): WebdriverIO.Element {
        return this._wdioElement;
    }

    //not used
    get numberAccount(): string {
        return '';
    }

    get platformAccount(): string {
        return '';
    }

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.element.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.buttonSettings.waitForDisplayed(options));
    }
}
