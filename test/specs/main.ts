import {SignInPage} from '../pageObjects/signin.page';
import {AccountsPage} from "../pageObjects/accounts.page";
import {Opts} from '../config/config';

const signInPage = new SignInPage();
const accountsPage = new AccountsPage();
const cfg = Opts['prod'];

describe('Exness selenium test task', () => {

    it('should login with valid credentials', () => {
        signInPage.open().waitLoaded({timeout: 5000});
        signInPage.login(cfg.user.login, cfg.user.password).waitLoaded({timeout: 10000});
        expect(accountsPage.formAccounts).toBeDisplayed();
    });

    it.only(`should create new demo account: ${JSON.stringify(cfg.user.newAccount)}`, () => {
        accountsPage.openNewAccount(cfg.user.newAccount);
    });

    it('should contain archived and demo accounts', () => {
        expect(accountsPage.getArchived('kd').element).toBeDisplayed();
        expect(accountsPage.getDemo('28182764').element).toBeDisplayed();

    });

    it('should disappear from demo when archived', () => {
        let demoAcc = accountsPage.getDemo('28182764');

        demoAcc.archive();
        expect(demoAcc.element).not.toBeExisting();
    });

    it('should appear in archived', () => {
        let archivedAcc = accountsPage.getArchived('28182764');

        expect(archivedAcc.element).toBeDisplayed();
        expect(archivedAcc.numberAccount).toEqual('#28182764');
        expect(archivedAcc.platformAccount).toEqual('MT5');
    });
});