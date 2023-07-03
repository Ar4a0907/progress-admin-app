import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '../store/AppStore';
import { fetchUsers, registrationWithoutLogin, removeOneUser } from '../http/userAPI';
import { User } from '../store/UserStore';
import { FaRegTrashCan } from "react-icons/fa6";

const Users = observer(() => {
    const { userStore } = useAppStore();
    const [removeUser, setRemoveUser] = useState<null|number>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputValues, setInputValue] = useState({
        email: "",
        password: "",
        role: "",
        passwordRepeat: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setInputValue(current => ({ ...current, [name]: value }));
    }

    const removeAccept = async () => {
        if (removeUser) {
            await removeOneUser(removeUser);
        }
        setShowRemove(false);
        setRemoveUser(null);
        window.location.reload();
    }

    const removeCancel = () => {
        setShowRemove(false);
        setRemoveUser(null);
    }

    const handleRemove = async (id: number) => {
        setRemoveUser(id);
        setShowRemove(true);
    }

    const handleAdd = async () => {
        const { email, password, role } = inputValues;
        await registrationWithoutLogin( email, password, role );
        setInputValue({
            email: "",
            password: "",
            role: "",
            passwordRepeat: "",
        })
        setShowAdd(false);
        window.location.reload();
    }

    useEffect(() => {
        let boolean = true;
        console.log(inputValues.role)
        for (const [key, value] of Object.entries(inputValues)) {
            if (value.trim() === '') {
                boolean = false;
            }
        }

        if(inputValues.password !== inputValues.passwordRepeat) {
            boolean = false;
        }

        setIsFormValid(boolean);
    }, [inputValues])

    useEffect(() => {
        fetchUsers().then(data => {
            userStore.setAllUsers(data);
            const currentUserIndex = data.findIndex((item : User) => item.id === userStore.User.id);
            if (currentUserIndex !== -1) {
                const currentUser = data.splice(currentUserIndex, 1)[0];
                data.unshift(currentUser);
                userStore.setAllUsers(data);
            }
        });
    }, [userStore]);

    return (
        <>
            <Container className="pt-5 pb-5">
                <Row className="mb-4 flex-row">
                    <Col><h2 className="mb-4">Пользователи</h2></Col>
                    <Col md="auto">
                        <Button
                            style={{ width: 'fit-content' }}
                            variant={ 'outline-success' }
                            onClick={ () => setShowAdd(true) }
                        >
                            Новый пользователь
                        </Button>
                    </Col>
                </Row>
                {userStore.AllUsers.map((item) => (
                    <Card className="mt-2" key={item.id}>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title>
                                        {item.email}&nbsp;
                                        {
                                            userStore.User.id === item.id ?
                                                <span
                                                    className="text-secondary"
                                                    style={{ fontWeight: 400, fontSize: '0.8em' }}
                                                >
                                                    Вы
                                                </span>
                                                : null
                                        }
                                    </Card.Title>
                                    <Card.Text>
                                        {item.role}
                                    </Card.Text>
                                </Col>
                                <Col md="auto">
                                    {
                                        userStore.User.id !== item.id ?
                                            <Button
                                                className="d-flex justify-content-center align-items-center h-auto p-2"
                                                variant={ 'danger' }
                                                onClick={ () => handleRemove(item.id) }
                                                title="Удалить клиента"
                                            >
                                                <FaRegTrashCan/>
                                            </Button>
                                            : null
                                    }

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>

            <Modal
                centered
                show={ showAdd }
                onHide={ () => setShowAdd(false) }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить нового пользователя:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-2"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={inputValues.email}
                        />

                        <Form.Select
                            className="mt-2"
                            name="role"
                            onChange={handleChange}
                        >
                            <option value="">Уровень доступа</option>
                            <option value="ADMIN">Адмэн</option>
                            <option value="MOD">Модератор</option>
                            <option value="USER">Щущора</option>
                        </Form.Select>

                        <Form.Control
                            className="mt-2"
                            placeholder="Пароль"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={inputValues.password}
                        />

                        <Form.Control
                            className="mt-2"
                            placeholder="Повторите пароль"
                            name="passwordRepeat"
                            type="password"
                            onChange={handleChange}
                            value={inputValues.passwordRepeat}
                        />
                        <Button
                            variant={'success'}
                            className="mt-2 align-self-end"
                            disabled={!isFormValid}
                            onClick={ handleAdd }
                        >
                            Добавить пользователя
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                centered
                show={ showRemove }
                onHide={ () => setShowRemove(false) }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Удалить пользователя?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить пользователя без возможности вернуть его?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ removeCancel }>
                        Нет
                    </Button>
                    <Button variant="danger" onClick={ removeAccept }>
                        Да
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default Users;