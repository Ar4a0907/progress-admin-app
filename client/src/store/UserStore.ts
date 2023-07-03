import { makeAutoObservable, toJS } from 'mobx';

import AppStore from './AppStore';

export type User = {
    email: string;
    exp: number;
    iat: number;
    id: number;
    role: string;
};

export default class UserStore {
    appStore;
    private isAuth = false;
    private user = {} as User;
    private allUsers: User[] = [];

    constructor (appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.appStore = appStore;
    }

    setIsAuth(boolean: boolean) {
        this.isAuth = boolean;
    }

    setUser(user: User) {
        this.user = user;
    }

    setAllUsers(users: User[]) {
        this.allUsers = users;
    }

    get IsAuth() {
        return this.isAuth;
    }

    get User() {
        return this.user;
    }

    get AllUsers() {
        return toJS(this.allUsers);
    }
}
