import { Client } from '../store/ClientsStore';

import { authHost, host } from './index';

export const createClient = async (client: Client) => {
    const { data } = await authHost.post('api/client', { ...client });
    return data;
};

export const fetchClients = async () => {
    const { data } = await host.get('api/client/');
    return data;
};

export const fetchOneClient = async (id: number) => {
    const { data } = await host.get(`api/client/${id}`);
    const managers =  await fetchClientManagers(id);
    const client = { ...data, managers };

    return client;
};

export const removeOneClient = async (id: number) => {
    const { data } = await host.delete('api/client/', { data: { id } } );
    return data;
};

export const createManager = async (manager: any) => {
    const { data } = await authHost.post('api/manager/', { ...manager });
    return data;
};

export const fetchClientManagers = async (id: number) => {
    const { data } = await host.get(`api/manager/${id}`);
    return data;
};

export const removeOneManager = async (id: number) => {
    const { data } = await host.delete('api/manager/', { data: { id } } );
    return data;
};


