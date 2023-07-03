import { User } from '../store/UserStore';

import { authHost, host } from './index';
import { Client } from "../store/ClientsStore";

export const createClient = async (client: Client) => {
    const { data } = await authHost.post('api/client', { ...client });
    return data;
};

export const fetchClients = async () => {
    const { data } = await host.get('api/client/');
    return data;
};

export const fetchOneClient = async () => {
    const { data } = await host.get('api/client/');
    return data;
};

export const removeOneClient = async (id: number) => {
    const { data } = await host.delete('api/client/', { data: { id } } );
    return data;
};


