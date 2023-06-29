import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { useUserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";
import { CLIENTS_ROUTE, LOGIN_ROUTE, USERS_ROUTE } from '../utils/consts';

export const NavBar = observer(() => {
    const { IsAuth, setIsAuth, setUser } = useUserStore();
    const navigate = useNavigate();

    const logOut = () => {
        setIsAuth(false);
        setUser({});
        sessionStorage.removeItem('token');
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/client">Progress App</Navbar.Brand>
                {IsAuth ?
                    (<Nav className="ml-auto">
                        <Button variant={'secondary'} href={USERS_ROUTE}>Пользователи</Button>
                        <Button variant={'secondary'} className="ms-4" href={CLIENTS_ROUTE}>Клиенты</Button>
                        <Button variant={'danger'} className="ms-4" onClick={logOut}>Выйти</Button>
                    </Nav>)
                    :
                    null
                }
            </Container>
        </Navbar>
    );
});
