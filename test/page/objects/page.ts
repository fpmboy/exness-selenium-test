/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export enum PageType {
    SignInPage = 'SignInPage',
    AccountsPage = 'AccountsPage',
    NewAccountPage = 'NewAccountPage'
}

export abstract class Page {

    public static type: PageType;
    public abstract waitOpened(options?: WebdriverIO.WaitForOptions): boolean;
    public abstract waitLoaded(options?: WebdriverIO.WaitForOptions): boolean;

    //opens wdio.cong.js:baseUrl + uri in browser
    open (uri: string): Page {
        browser.url(uri);
        return this
    }
}