import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { registration } from '../http/userAPI';
import { CLIENTS_ROUTE } from '../utils/consts';
import { useAppStore } from '../store/AppStore';
import { User } from '../store/UserStore';

export const AuthRegister = observer(() => {
    const navigate = useNavigate();
    const { userStore } = useAppStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleClick = async () => {
        try {
            const data = await registration(email, password, role);
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
                <h2 className="m-auto text-center">
                    Зарегистрировать нового пользователя
                </h2>
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

                    <Form.Control
                        className="mt-2"
                        placeholder="Повторно введите пороль"
                    />
                    <Form.Select
                        className="mt-2"
                        onChange={event => setRole(event.target.value)}
                    >
                        <option>Уровень доступа</option>
                        <option value="ADMIN">Адмэн</option>
                        <option value="MOD">Модератор</option>
                        <option value="USER">Щущора</option>
                    </Form.Select>

                    <Button
                        variant={'success'}
                        className="mt-2 align-self-end"
                        onClick={handleClick}
                    >
                        Зарегистрировать
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});
