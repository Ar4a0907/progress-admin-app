import { makeAutoObservable, toJS } from 'mobx';

import AppStore from './AppStore';

export type Managers = {
    id: number;
    name: string;
    firm: string;
    country: string;
    city: string;
    address: string;
    postCode: string;
    phone: string;
    email: string;
}

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
    managers?: Managers[];
};

export default class ClientsStore {
    appStore;
    private clients:  Client[] = [];
    private currentClient: Client | null = null;

    constructor (appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.appStore = appStore;
    }

    setClients(clients: Client[]) {
        this.clients = clients;
    }

    setCurrentClient(client: Client | null) {
        this.currentClient = client;
    }

    get CurrentClient() {
        return toJS(this.currentClient);
    }

    get Clients() {
        return toJS(this.clients);
    }
}
