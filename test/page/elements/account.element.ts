/**
 * main account element object containing all methods, selectors and functionality
 * that is shared across all accounts objects
 */
export enum AccountType {
    Archived = 'Archived',
    Demo = 'Demo',
    Real = 'Real'
}

export abstract class AccountElement <T extends AccountType>{
    public static type: AccountType;
    abstract get elementType(): T;

    public abstract waitOpened(options?: WebdriverIO.WaitForOptions): boolean;
    public abstract waitLoaded(options?: WebdriverIO.WaitForOptions): boolean;
    public abstract get numberAccount(): string;
    public abstract get platformAccount(): string;

    protected abstract get element(): WebdriverIO.Element;
    protected constructor(protected _wdioElement: WebdriverIO.Element) {}
}