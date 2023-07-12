import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { registrationWithoutLogin } from '../../http/userAPI';

type PropsType = {
    fetchAllUsers: () => void;
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
    showAdd: boolean;
}

const AddUserModal = (props: PropsType) => {
    const { fetchAllUsers, showAdd, setShowAdd } = props;
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputValues, setInputValue] = useState({
        email: '',
        password: '',
        role: '',
        passwordRepeat: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setInputValue(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAdd = async () => {
        const { email, password, role } = inputValues;
        await registrationWithoutLogin( email, password, role );
        fetchAllUsers();
        setInputValue({
            email: '',
            password: '',
            role: '',
            passwordRepeat: '',
        });
        setShowAdd(false);
    };

    useEffect(() => {
        const boolean = Object.values(inputValues).every((value) => value.trim() !== '')
            &&
            inputValues.password === inputValues.passwordRepeat;
        setIsFormValid(boolean);
    }, [inputValues]);

    return (
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
    );
};

export default AddUserModal;