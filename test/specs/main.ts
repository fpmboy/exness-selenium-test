import { SignInPage } from '../page/objects/signin.page';
import { AccountsPage } from "../page/objects/accounts.page";
import { getAccountWithRandomName as rndAccount, Opts } from '../config/config';
import { newAccountPlatform, newAccountType } from '../config/config';


const signInPage = new SignInPage();
const accountsPage = new AccountsPage();
const { login, password } = Opts['prod'][0].user;
const newAcc = rndAccount(5);

describe(`Positive test with ${newAcc.title}`, () => {

    it(`should login with valid credentials ${login} ${password}`, () => {
        signInPage.open().waitLoaded({timeout: 10000, interval: 1000});
        signInPage.login(login, password).waitLoaded({timeout: 20000, interval: 1000});
        expect(accountsPage.formAccounts).toBeDisplayed();
    });

    it(`should create new Standard MT4 account and appear in demo`, () => {
        newAcc.platform = newAccountPlatform.MT4;
        newAcc.type = newAccountType.Standard;
        accountsPage.openNewDemo(newAcc);
        expect(accountsPage.getDemo(newAcc).element).toBeDisplayed();
    });

    it('should disappear from demo when archived', () => {
        accountsPage.getDemo(newAcc).archive();
        expect(accountsPage.getDemo(newAcc).element).not.toBeExisting();
    });

    it('should appear in archived', () => {
        expect(accountsPage.getArchived(newAcc).element).toBeDisplayed();
    });
});