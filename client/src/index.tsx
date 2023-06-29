import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { userStore, UserStoreContext } from "./store/UserStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <UserStoreContext.Provider value={ userStore }>
        <App />
    </UserStoreContext.Provider>,
);

