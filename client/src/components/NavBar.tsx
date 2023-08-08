import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { CLIENTS_ROUTE, LOGIN_ROUTE, REQUESTS_ROUTE, USERS_ROUTE } from '../utils/consts';
import { useAppStore } from '../store/AppStore';
import { User } from '../store/UserStore';

export const NavBar = observer(() => {
    const { userStore } = useAppStore();
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setIsAuth(false);
        userStore.setUser({} as User);
        sessionStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/client">Progress App</Navbar.Brand>
                {userStore.IsAuth ?
                    (<Nav className="ml-auto">
                        <Button variant={'secondary'} href={REQUESTS_ROUTE}>Запросы</Button>
                        <Button variant={'secondary'} className="ms-4" href={USERS_ROUTE}>Пользователи</Button>
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
