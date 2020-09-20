import { SignInPage } from '../page/objects/signin.page';
import { AccountsPage } from "../page/objects/accounts.page";
import { getAccountWithRandomName as rndAccount, Opts } from '../config/config';
import { newAccountPlatform, newAccountType } from '../config/config';

const signInPage = new SignInPage();
const accountsPage = new AccountsPage();
const { login, password } = Opts['prod'][1].user;
const newAcc = rndAccount(5);

describe(`Positive test with ${newAcc.title}`, () => {

    it(`should login with valid credentials ${login} ${password}`, () => {
        expect(signInPage.open().waitLoaded({timeout: 10000, interval: 1000})).toBeTruthy();
        signInPage.login(login, password);
        expect(accountsPage.waitLoaded({timeout: 20000, interval: 1000})).toBeTruthy();
    });

    it(`should create new MT5 RawSpread account and appear in demo`, () => {
        newAcc.platform = newAccountPlatform.MT5;
        newAcc.type = newAccountType.RawSpread;
        accountsPage.openNewDemo(newAcc);
        accountsPage.tabDemo.click();
        accountsPage.switchGridView({timeout: 10000});
        accountsPage.switchNewestSort({timeout: 10000});
        expect(accountsPage.getDemo(newAcc).element).toBeDisplayed();
    });

    it('should disappear from demo when archived', () => {
        accountsPage.getDemo(newAcc).archive();
        accountsPage.waitLoaded();
        expect( accountsPage.getDemo(newAcc).element).not.toBeExisting({wait: 1000, interval:100});
    });

    it('should appear in archived', () => {
        accountsPage.tabArchived.click();
        accountsPage.switchGridView({timeout: 10000});
        accountsPage.switchNewestSort({timeout: 10000});
        expect(accountsPage.getArchived(newAcc).element).toBeDisplayed();
    });
});