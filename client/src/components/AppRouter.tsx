import React from 'react';
import { Routes ,Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { authRoutes, publicRoutes } from '../routes';
import { CLIENTS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useAppStore } from '../store/AppStore';

export const AppRouter = observer(() => {
    const { userStore } = useAppStore();

    return (
        <Routes>
            { userStore.IsAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            { publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="*" element={ <Navigate replace to={ userStore.IsAuth ? CLIENTS_ROUTE : LOGIN_ROUTE }/> } />
        </Routes>
    );
});
