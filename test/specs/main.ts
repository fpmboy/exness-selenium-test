import {SignInPage} from '../page/objects/signin.page';
import {AccountsPage} from "../page/objects/accounts.page";
import {Opts} from '../config/config';

const signInPage = new SignInPage();
const accountsPage = new AccountsPage();
const { login, password } = Opts['prod'].user;
const newAcc = Opts['prod'].user.newAccount;


describe(`Test with ${JSON.stringify(newAcc)}`, () => {

    it('should login with valid credentials', () => {
        signInPage.open().waitLoaded({timeout: 5000});
        signInPage.login(login, password).waitLoaded({timeout: 10000});
        expect(accountsPage.formAccounts).toBeEnabled();
    });

    it(`should create new account and appear in demo`, () => {
        accountsPage.openNewDemo(newAcc);
        expect(accountsPage.getDemo(newAcc).element).toBeDisplayed();
    });

    it('should disappear from demo when archived', () => {
        accountsPage.getDemo(newAcc).archive();
        expect(accountsPage.getDemo(newAcc).element).not.toBeExisting({wait: 5000});
    });

    it('should appear in archived', () => {
        expect(accountsPage.getArchived(newAcc).element).toBeDisplayed();
    });
});