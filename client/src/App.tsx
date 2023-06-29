import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './components/AppRouter';
import { NavBar } from './components/NavBar';
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { useUserStore } from "./store/UserStore";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const {setUser, setIsAuth} = useUserStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            setUser(data);
            setIsAuth(true);
        }).catch(() => {
            console.log("User unauthorized")
        })
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
