import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: AxiosRequestConfig) => {
    if(config.headers) {
        config.headers.authorization = `Bearer ${sessionStorage.getItem( 'token' )}`
    }
    return config as InternalAxiosRequestConfig
}

authHost.interceptors.request.use(authInterceptor)

export {
    host,
    authHost
}