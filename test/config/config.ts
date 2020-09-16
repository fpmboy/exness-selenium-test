export enum newAccountType {
    Standard = 'Standard',
    RawSpread = 'Raw Spread',
    Zero = 'Zero',
    Pro = 'Pro'
}

export enum newAccountPlatform {
    MT4 = 'MT4',
    MT5 = 'MT5'
}

export interface AccountUser {
    title: string,
    pass?: string,
    type?: newAccountType,
    platform?: newAccountPlatform
}

export interface User {
    login: string;
    password: string;
    newAccount: AccountUser;
}

export interface Options {
    prefixSelector?: string;
    user: User;
}

export function getAccountWithRandomName(lengthName: number): AccountUser {
    let strRandom = (Math.random() +1).toString(36).substr(2, lengthName);
    return {
        title: `#${strRandom}`,
        pass: 'Ex11235813'
    };
}

export const Opts: { [key: string]: Options[] } = {
    test: [
        { user: {
                login: 'danenkouskrill@gmail.com',
                password: 'Ex11235813',
                newAccount: getAccountWithRandomName(4)
                }
            }
        ],
    prod: [
        { user: {
                login: 'danenkouskrill@gmail.com',
                password: 'Ex11235813',
                newAccount: getAccountWithRandomName(4)
            }
        },
        { user: {
                login: 'fpmboy@gmail.com',
                password: 'Ex11235813',
                newAccount: getAccountWithRandomName(4)
            }
        },
    ],
};