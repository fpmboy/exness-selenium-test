import { SignInPage } from '../page/objects/signin.page';
import { AccountsPage } from '../page/objects/accounts.page';
import { getAccountWithRandomName as rndAccount, Opts } from '../config/config';
import { newAccountPlatform as platform, newAccountType as type } from '../config/config';

const signInPage = new SignInPage();
const accountsPage = new AccountsPage();

//if needed can be saved in separate *.ts file and be imported
const testData = [
    { p: platform.MT5, t: type.Pro },
    { p: platform.MT4, t: type.RawSpread }]

describe(`Archiving demo account in list view`, () => {

    //executes once, before starting test suite, to prepare application for tests
    before(() => {
        const { login, password } = Opts['prod'][1].user;
        signInPage.open().waitLoaded();
        signInPage.login(login, password);
        accountsPage.waitLoaded();
    });

    //executes before each test case, setup preconditions for test case
    beforeEach(() =>{
        accountsPage.open();
        accountsPage.waitLoaded();
    });

    testData.forEach(({p, t}) => {
        let newAcc = rndAccount(5);
        describe(`Demo account ${newAcc.title} on platform ${p} and type ${t}`, () => {
            it(`should be archived`, () => {
                accountsPage.waitLoaded();
                accountsPage.switchListView();
                accountsPage.switchNewestSort();

                newAcc.platform = p;
                newAcc.type = t;
                accountsPage.openNewDemo(newAcc);
                accountsPage.alertCloseButton.waitForDisplayed();
                accountsPage.alertCloseButton.click();
                accountsPage.tabDemo.click();
                //expect demo was successfully created, if fails no need to proceed
                expect(accountsPage.getDemo(newAcc).element).toBeDisplayed();
                accountsPage.getDemo(newAcc).archive();
                //expect demo disappeared from demo tab, if fails no need to proceed
                expect(accountsPage.getDemo(newAcc).element).not.toBeExisting();
                accountsPage.tabArchived.click();
                //expect demo appeared in archived tab
                expect(accountsPage.getArchived(newAcc).element).toBeDisplayed();
            });
        });
    });
});