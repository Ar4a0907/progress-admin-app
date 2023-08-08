import { makeAutoObservable } from 'mobx';
import React from 'react';

import { check } from '../http/userAPI';

import UserStore, { User } from './UserStore';
import ClientsStore from './ClientsStore';
import { RequestStore } from './RequestStore';

export default class AppStore {
    userStore = new UserStore(this);
    clientsStore = new ClientsStore(this);
    requestStore = new RequestStore(this);
    private loading = true;

    constructor () {
        makeAutoObservable(this, {}, { autoBind: true });
        this.checkUser();
    }

    setLoading(boolean: boolean) {
        this.loading = boolean;
    }

    checkUser() {
        check()
            .then(data => {
                this.userStore.setUser(data as User);
                this.userStore.setIsAuth(true);
            })
            .catch(() => {})
            .finally(() => this.setLoading(false));
    };

    get Loading() {
        return this.loading;
    }
}

export const AppStoreContext = React.createContext<AppStore | null>(null);
export const appStore = new AppStore();

export function useAppStore() {
    const context = React.useContext(AppStoreContext);
    if (!context) {
        throw new Error('Wrap element with context first!');
    }
    return context;
}