import { makeAutoObservable } from 'mobx';
import React from 'react';

export type User = {} | {
    email: string;
    exp: number;
    iat: number;
    id: number;
    role: string;
};

export default class UserStore {
    private isAuth = false;
    private user: any = {};

    constructor () {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setIsAuth(boolean: boolean) {
        this.isAuth = boolean;
    }

    setUser(user: any) {
        this.user = user;
    }

    get IsAuth() {
        return this.isAuth;
    }

    get User() {
        return this.user;
    }
}

export const UserStoreContext = React.createContext<UserStore | null>(null);
export const userStore = new UserStore();

export function useUserStore() {
    const context = React.useContext(UserStoreContext);
    if (!context) {
        throw new Error('Wrap element with context first!');
    }
    return context;
}