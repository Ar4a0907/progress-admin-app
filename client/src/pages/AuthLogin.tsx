import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { login } from '../http/userAPI';
import { CLIENTS_ROUTE } from '../utils/consts';
import { useAppStore } from '../store/AppStore';
import { User } from '../store/UserStore';

export const AuthLogin = observer(() => {
    const navigate = useNavigate();
    const { userStore } = useAppStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        try {
            const data = await login(email, password);
            userStore.setUser(data as User);
            userStore.setIsAuth(true);
            navigate(CLIENTS_ROUTE);
        } catch ( e: any ) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 58 }}
        >
            <Card style={{ maxWidth: 600 }} className="p-5 w-100">
                <h2 className="m-auto text-center">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-5"
                        placeholder="Введите email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите пороль"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                    />
                    <Button
                        variant={'success'}
                        className="mt-2 align-self-end"
                        onClick={handleClick}
                    >
                        Войти
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});
