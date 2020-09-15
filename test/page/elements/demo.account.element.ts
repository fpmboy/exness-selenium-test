import {AccountElement, AccountType} from "./account.element";



export class DemoAccount extends AccountElement<AccountType> {

    /**
     * all selectors are specified in this sections throw getters
     */
    get buttonSettings() {
        return this.element.$(`./div[1]/div[2]`);
    }

    get menuSettings() {
        this.buttonSettings.click();
        //console.log('\nMENU:\n ', this.buttonSettings.$(`./div[2]`).getText());
        return this.element.$(`./div[2]`);
    }
    /**
     * a methods to encapsulate automation code to interact with the element
     */
    archive() {
        this.menuSettings.waitForDisplayed();
        this.element.$(`span=Archive account`).click();
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

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.element.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.buttonSettings.waitForDisplayed(options));
    }

    //bad fast selectors. Can be xpath with partial matching attribute name, but slow
    get numberAccount(): string {
        return this.element.$('./div[2]/div[1]/div[2]').getText();
    }

    get platformAccount(): string {
        return this.element.$('./div[2]/div[2]/div[2]').getText();
    }
}
