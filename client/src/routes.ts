import { Admin } from './pages/Admin';
import {
    ADMIN_ROUTE,
    CLIENTS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    REQUESTS_ROUTE,
    USERS_ROUTE,
} from './utils/consts';
import { Clients } from './pages/Clients';
import { AuthRegister } from './pages/AuthRegister';
import { OneClient } from './pages/OneClient';
import { AuthLogin } from './pages/AuthLogin';
import Users from './pages/Users';
import Requests from './pages/Requests';
import OneRequest from './pages/OneRequest';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: CLIENTS_ROUTE,
        Component: Clients,
    },
    {
        path: USERS_ROUTE,
        Component: Users,
    },
    {
        path: CLIENTS_ROUTE + '/:id',
        Component: OneClient,
    },
    {
        path: REQUESTS_ROUTE + '/:id',
        Component: OneRequest,
    },
    {
        path: REQUESTS_ROUTE,
        Component: Requests,
    },
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthLogin,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthRegister,
    },
];