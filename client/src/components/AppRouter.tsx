import React from 'react';
import { Routes ,Route, Navigate } from 'react-router-dom';

import { authRoutes, publicRoutes } from '../routes';
import { CLIENTS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useUserStore } from '../store/UserStore';

export const AppRouter = () => {
    const { IsAuth } = useUserStore();

    return (
        <Routes>
            { IsAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            { publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="*" element={ <Navigate replace to={ IsAuth ? CLIENTS_ROUTE : LOGIN_ROUTE }/> } />
        </Routes>
    );
};
