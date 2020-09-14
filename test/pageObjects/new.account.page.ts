import {Page, PageType} from './page'
import {AccountUser} from '../config/config';

export class NewAccountPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */

    get formNewDemoType(){
        return $('h1=Open New Account').$('../..');
    }

    get buttonNewDemoStandart() {
        return $(`[href="/pa/new-account/mt5_mini_trial_vc"]`);
    }

    /**
     * a methods to encapsulate automation code to interact with the page
     */
    create(accToCreate: AccountUser) {

    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type: PageType;

    open ():Page {
        return super.open('pa/new-account/');
    }

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formNewDemoType.waitForDisplayed(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return (options == null);
    }
}