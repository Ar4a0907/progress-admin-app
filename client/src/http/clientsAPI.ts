import { Client } from '../store/ClientsStore';

import { authHost } from './index';

export const createClient = async (client: Client) => {
    const { data } = await authHost.post('api/client', { ...client });
    return data;
};

export const fetchClients = async () => {
    const { data } = await authHost.get('api/client/');
    return data;
};

export const fetchOneClient = async (id: number) => {
    try {
        const { data } = await authHost.get(`api/client/${id}`);
        const managers =  await fetchClientManagers(id);
        const client = { ...data, managers };
        return client;
    } catch ( e ) {
        // eslint-disable-next-line
        console.log(e);
        return null;
    }
};

export const removeOneClient = async (id: number) => {
    const { data } = await authHost.delete('api/client/', { data: { id } } );
    return data;
};

export const createManager = async (manager: any) => {
    const { data } = await authHost.post('api/manager/', { ...manager });
    return data;
};

export const fetchClientManagers = async (id: number) => {
    const { data } = await authHost.get(`api/manager/${id}`);
    return data;
};

export const removeOneManager = async (id: number) => {
    const { data } = await authHost.delete('api/manager/', { data: { id } } );
    return data;
};


