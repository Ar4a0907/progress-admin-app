import jwt_decode from 'jwt-decode';

import { authHost, host } from './index';

export const registration = async (email: string, password:string, role: string) => {
    const { data } = await  host.post('api/user/registration', { email, password, role });
    sessionStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const registrationWithoutLogin = async (email: string, password:string, role: string) => {
    const { data } = await  host.post('api/user/registration', { email, password, role });
    return data;
};

export const login = async (email: string, password:string) => {
    const { data } = await  host.post('api/user/login', { email, password });
    sessionStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const fetchUsers = async () => {
    const { data } = await  authHost.get('api/user/');
    return data;
};

export const check = async () => {
    const { data }  = await  authHost.get('api/user/auth');
    sessionStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const removeOneUser = async (id: number) => {
    const { data } = await authHost.delete('api/user/', { data: { id } } );
    return data;
};