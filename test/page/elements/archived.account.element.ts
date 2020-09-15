import {AccountElement, AccountType} from "./account.element";

const enum selector {
    buttonReactivate = `button[data-test="account-card-restore-button"]`,
    numberAccount = './div[2]',
    platformAccount = './div[1]/div[2]'
}

export class ArchivedAccount extends AccountElement<AccountType> {

    /**
     * all selectors are specified in this sections throw getters
     */
    get buttonReactivate() {
        return this.element.$(selector.buttonReactivate);
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

    get numberAccount(): string {
        return this.element.$(selector.numberAccount).getText();
    }

    get platformAccount(): string {
        return this.element.$(selector.platformAccount).getText();
    }
}
