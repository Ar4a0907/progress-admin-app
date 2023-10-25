import { makeAutoObservable, toJS } from 'mobx';

import AppStore from './AppStore';
import { Managers } from './ClientsStore';

export type RequestType = {
    id: number,
    managerId: number,
    pvn: boolean,
    sum: number,
    discount: number,
    total: number,
    manager?: Managers,
    updatedAt: string,
    requestRows: RequestRow[],
    description: string,
};

export type RequestRow = {
    id: number,
    article: string,
    description: string,
    count: number,
    cost: number,
    discount: number,
    total: number,
    file: string,
    requestId: number,
};

export class RequestStore {
    appStore;
    private requests: RequestType[] = [];
    private currentRequest: RequestType | null = null;

    constructor (appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.appStore = appStore;
    }

    setRequests(requests: RequestType[]) {
        this.requests = requests;
    }

    setCurrentRequest(request: RequestType | null) {
        this.currentRequest = request;
    }

    get Requests() {
        return toJS(this.requests);
    }

    get CurrentRequest() {
        return toJS(this.currentRequest);
    }
}