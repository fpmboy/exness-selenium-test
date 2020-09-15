import {AccountElement, AccountType} from "./account.element";



export class ArchivedAccount extends AccountElement<AccountType> {

    /**
     * all selectors are specified in this sections throw getters
     */
    get buttonReactivate() {
        return this.element.$(`button[data-test="account-card-restore-button"]`);
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type = AccountType.Archived;

    constructor(protected _wdioElement: WebdriverIO.Element) {
        super(_wdioElement);
    }

    get elementType() {
        return ArchivedAccount.type;
    }

    get element(): WebdriverIO.Element {
        return this._wdioElement;
    }

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.element.waitForExist(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (this.waitOpened(options)
            && this.buttonReactivate.waitForDisplayed(options));
    }

    //bad fast selectors. Can be xpath with partial matching attribute name, but slow
    get numberAccount(): string {
        return this.element.$('./div[2]').getText();
    }

    get platformAccount(): string {
        return this.element.$('./div[1]/div[2]').getText();
    }
}
