import { AccountElement, AccountType } from "./account.element";
import { elementArchivedAccount as selector } from '../layout/desktop';

export class ArchivedAccount extends AccountElement {

    /**
     * all selectors are used in this sections throw getters
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
            && this.buttonReactivate.waitForDisplayed(options));
    }
}
