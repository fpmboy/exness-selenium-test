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
        expect(accountsPage.formAccounts).toBeDisplayed();
    });

    it(`should create new account and appear in demo`, () => {
        accountsPage.openNewAccount(newAcc).waitLoaded();
        expect(accountsPage.getDemo(newAcc).element).toBeDisplayed({wait: 5000});
    });

    it('should disappear from demo when archived', () => {
        let demoAcc = accountsPage.getDemo(newAcc);

        demoAcc.archive();
        expect(demoAcc.element).not.toBeExisting();
    });

    it('should appear in archived', () => {
        let archivedAcc = accountsPage.getArchived(newAcc);

        expect(archivedAcc.element).toBeDisplayed();
        expect(archivedAcc.numberAccount).toEqual(newAcc.title);
        expect(archivedAcc.platformAccount).toEqual(newAcc.platform);
    });
});