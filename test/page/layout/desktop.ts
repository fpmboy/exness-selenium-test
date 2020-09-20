export const enum elementArchivedAccount {
    buttonReactivate = `button[data-test="account-card-restore-button"]`,
}

export const enum elementDemoAccount {
    buttonSettings = `[class*=DropdownButton_container]`,
    menuList = `[class*=ActionList_container]`,
    menuArchive = `span=Archive account`,
}

export const enum pageAccounts {
    formAccounts = `[name="accountsContainer"]`,
    selectorSort = `#account_sort_select`,
    selectorNewestSort = `#list_account_sort_select_NEWEST`,
    togglerView = `[data-walkthrough="accountListMode"]`,
    togglerGridView = `./div[2]`,
    btnNewAccount = `[data-test="accounts-open-new-account-btn"]`,
    notifyEmptyList = '[class*=AccountsPage_accountsPlaceholder]',
    containerListAccounts = `[data-test="accounts-page-active-accounts-section"]`,
    tabList = `[class*=Tabs_container]`,
    tabDemo = `./div[2]`,
    tabArchived = `./div[3]`,
    alert = `[role="alert"]`,
    uri = '/pa/',
}

export const enum pageNewAccount {
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
    btnCreateAccount = `[data-test="acc-form-submit"]`,
    uri = '/pa/new-account/',
}

export const enum pageSignIn {
    formSignIn = `<signin-form>`,
    inputLogin = `#login`,
    inputPassword = `#password`,
    btnSubmit = `button[type="submit"]`,
    uri = '/accounts/sign-in',
}