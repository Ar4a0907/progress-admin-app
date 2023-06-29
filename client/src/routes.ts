import { Admin } from './pages/Admin';
import { ADMIN_ROUTE, CLIENTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USERS_ROUTE } from './utils/consts';
import { Clients } from './pages/Clients';
import { AuthRegister } from './pages/AuthRegister';
import { OneClient } from './pages/OneClient';
import { AuthLogin } from './pages/AuthLogin';
import Users from './pages/Users';

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
        path: REGISTRATION_ROUTE,
        Component: AuthRegister,
    },
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthLogin,
    },
];