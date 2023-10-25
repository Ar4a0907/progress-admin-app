import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppRouter } from './components/AppRouter';
import { NavBar } from './components/NavBar';
import { useAppStore } from './store/AppStore';

const App = observer(() => {
    const { Loading } = useAppStore();

    if (Loading) {
        return <Spinner animation={'grow'}/>;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
