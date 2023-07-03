import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { appStore, AppStoreContext } from './store/AppStore';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <AppStoreContext.Provider value={ appStore }>
        <App />
    </AppStoreContext.Provider>,
);

