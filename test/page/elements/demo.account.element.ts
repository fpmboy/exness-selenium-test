import {AccountElement, AccountType} from "./account.element";

const enum selector {
    buttonSettings = `[class*=DropdownButton_container]`,
    menuList = `[class*=ActionList_container]`,
    menuArchive = `span=Archive account`,
    numberAccount = './div[2]/div[1]/div[2]',
    platformAccount = './div[2]/div[2]/div[2]'
}

export class DemoAccount extends AccountElement<AccountType> {

    /**
     * all selectors are specified in this sections throw getters
     */
    get buttonSettings() {
        return this.element.$(selector.buttonSettings);
    }

    get menuList() {
        this.buttonSettings.click();
        let elem = this.element.$(selector.menuList);
        elem.waitForEnabled();
        return elem;
    }

    get menuArchived() {
        return this.menuList.$(selector.menuArchive);
    }

    /**
     * a methods to encapsulate automation code to interact with the element
     */
    archive() {
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

    get numberAccount(): string {
        return this.element.$(selector.numberAccount).getText();
    }

    get platformAccount(): string {
        return this.element.$(selector.platformAccount).getText();
    }

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.element.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.buttonSettings.waitForDisplayed(options));
    }
}
