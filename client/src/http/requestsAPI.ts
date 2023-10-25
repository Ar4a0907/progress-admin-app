import { authHost } from './index';

export const fetchRequests = async () => {
    const { data } = await authHost.get('api/request/');
    return data;
};

export const fetchOneRequest = async (id: string | number) => {
    const { data } = await authHost.get(`api/request/${id}`);
    return data;
};