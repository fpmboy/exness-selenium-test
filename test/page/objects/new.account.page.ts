import {Page, PageType} from './page'
import {AccountUser, newAccountPlatform, newAccountType} from '../../config/config';

const enum selector {
    formNewDemoType = `[class*=OpenAccount_accountsTypes]`,
    btnNewDemoStandard = `[href="/pa/new-account/mt5_mini_trial_vc"]`,
    btnNewDemoRawSpread = `[href="/pa/new-account/mt5_raw_trial_vc"]`,
    btnNewDemoZero = `[href="/pa/new-account/mt5_zero_trial_vc"]`,
    btnNewDemoPro = `[href="pa/new-account/mt5_classic_trial_vc"]`,
    formNewAccount = `[data-test="acc-form"]`,
    btnRadioDemo = `./div[2]/div[1]`,
    btnRadioMT4 = `./div[4]/div[1]`,
    btnRadioMT5 = `./div[4]/div[2]`,
    inputTitle = `#accName`,
    inputPassword = `#password`,
    btnCreateAccount = `[data-test="acc-form-submit"]`
}
const uri = '/pa/new-account/';

export class NewAccountPage extends Page {

    /**
     * all selectors are specified in this sections throw getters
     */
    get formNewAccount(){
        return $(selector.formNewAccount);
    }

    get btnRadioDemo(){
        return this.formNewAccount.$(selector.btnRadioDemo);
    }

    get btnRadioMT4(){
        return this.formNewAccount.$(selector.btnRadioMT4);
    }

    get btnRadioMT5(){
        return this.formNewAccount.$(selector.btnRadioMT5);
    }

    get inputTitle(){
        return $(selector.inputTitle);
    }

    get inputPassword(){
        return $(selector.inputPassword);
    }

    get btnCreateAccount(){
        return $(selector.btnCreateAccount);
    }

    get formNewDemoType(){
        return $(selector.formNewDemoType);
    }

    get btnNewDemoStandard() {
        return $(selector.btnNewDemoStandard);
    }

    get btnNewDemoRawSpread() {
        return $(selector.btnNewDemoRawSpread);
    }

    get btnNewDemoZero() {
        return $(selector.btnNewDemoZero);
    }

    get btnNewDemoPro() {
        return $(selector.btnNewDemoPro);
    }


    /**
     * a methods to encapsulate automation code to interact with the page
     */
    createDemo(accToCreate: AccountUser) {
        let options: WebdriverIO.WaitForOptions = {timeout: 5000, interval: 1000};

        this.formNewDemoType.waitForDisplayed(options);

        //click on button to create account of correct type
        switch (accToCreate.type) {
            case newAccountType.Standard:
                this.btnNewDemoStandard.click();
                break;
            case newAccountType.RawSpread:
                this.btnNewDemoRawSpread.click();
                break;
            case newAccountType.Zero:
                this.btnNewDemoZero.click();
                break;
            case newAccountType.Pro:
                this.btnNewDemoPro.click();
                break;
            default:
                this.btnNewDemoStandard.click();
        }

        this.btnRadioDemo.click();

        switch (accToCreate.platform){
            case newAccountPlatform.MT4:
                this.btnRadioMT4.click();
                break;
            case newAccountPlatform.MT5:
                this.btnRadioMT5.click();
                break;
            default:
                this.btnRadioMT4.click();
        }

        this.inputTitle.scrollIntoView();
        this.inputTitle.waitForEnabled(options);
        this.inputTitle.addValue(accToCreate.title);

        this.inputPassword.waitForEnabled(options);
        this.inputPassword.addValue(accToCreate.pass);

        this.btnCreateAccount.waitForClickable(options);
        this.btnCreateAccount.click();
    }

    /**
     * overwrite specific methods/fields to adapt it to page object
     */
    public static type: PageType;

    waitOpened(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formNewDemoType.waitForDisplayed(options);
    }

    waitLoaded(options?: WebdriverIO.WaitForOptions): boolean {
        return this.formNewAccount.waitForDisplayed(options);
    }

    open ():Page {
        return super.open(uri);
    }
}