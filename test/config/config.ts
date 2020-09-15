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

// export enum driverType {
//     Web, Android, mobileWeb, iOS
// }

export interface Options {
    prefixSelector?: string;
    // envUrl?: string;
    user: User;
    // driver: driverType;
}

function getRandomName(length: number): string {
    return (Math.random() +1).toString(36).substr(2, length);
}

export const Opts: { [key: string]: Options } = {
    test: {
        prefixSelector: '#',
        // envUrl: 'https://my.exness.com/',
        user: {
            login: 'danenkouskrill@gmail.com',
            password: 'Ex11235813',
            newAccount: {
                title: getRandomName(5),
                pass: 'Ex11235813',
                type: newAccountType.Zero,
                platform: newAccountPlatform.MT4
            }
        }
    },
    prod: {
        prefixSelector: '#',
        // envUrl: 'https://my.exness.com/',
        user: {
            login: 'danenkouskrill@gmail.com',
            password: 'Ex11235813',
            newAccount: {
                title: getRandomName(10),
                pass: 'Ex11235813'
            }
        }
    }
};