import { makeAutoObservable, toJS } from 'mobx';

import AppStore from './AppStore';

export type Client = {
    accountNumber: string;
    address: string;
    bank: string;
    code: string;
    createdAt?: string;
    emailInfo: string;
    emailInvoice: string;
    id: number;
    name: string;
    pvn: string;
    swift: string;
    updatedAt?: string;
};

export default class ClientsStore {
    appStore;
    private clients:  Client[] = [];

    constructor (appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.appStore = appStore;
    }

    setClients(clients: Client[]) {
        this.clients = clients;
    }

    get Clients() {
        return toJS(this.clients);
    }
}
