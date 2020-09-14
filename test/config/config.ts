export enum newAccountType {
    Standart = 'Standart',
    RawSpread = 'Raw Spread',
    Real = 'Real',
    Zero = 'Zero',
    Pro = 'Pro'
}

export interface AccountUser {
    title: string,
    password: string,
    newType?: newAccountType
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
                password: 'Ex11235813',
                newType: newAccountType.Zero
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
                password: 'Ex11235813',
                newType: newAccountType.RawSpread
            }
        }
    }
};