import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { createManager } from '../../http/clientsAPI';
import { Client } from '../../store/ClientsStore';

type PropsType = {
    fetchOneClient: (id: number) => Promise<Client>;
    setShowAdd: Dispatch<SetStateAction<boolean>>;
    showAdd: boolean;
    clientId: string | undefined;
    setClient: (client: Client | null) => void;
}

const AddManagerModal = (props: PropsType) => {
    const { fetchOneClient, setShowAdd, showAdd, clientId, setClient } = props;
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputValues, setInputValue] = useState({
        clientId: clientId,
        name: '',
        firm: '',
        country: '',
        city: '',
        address: '',
        postCode: '',
        phone: '',
        email: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputValue(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAdd = async () => {
        await createManager(inputValues);
        if (clientId) {
            const data = await fetchOneClient(parseInt(clientId));
            setClient(data);
        }
        setInputValue({
            clientId: clientId,
            name: '',
            firm: '',
            country: '',
            city: '',
            address: '',
            postCode: '',
            phone: '',
            email: '',
        });
        setShowAdd(false);
    };

    useEffect(() => {
        let boolean = true;
        for (const [, value] of Object.entries(inputValues)) {
            if (value?.trim() === '') {
                boolean = false;
            }
        }
        setIsFormValid(boolean);
    }, [inputValues]);

    return (
        <Modal
            centered
            show={ showAdd }
            onHide={ () => setShowAdd(false) }
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить нового менеджеа:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Row className="mt-2">
                        <Col>
                            <Form.Control
                                placeholder="Название"
                                name="name"
                                onChange={handleChange}
                                value={inputValues.name}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Код предприятия"
                                name="firm"
                                onChange={handleChange}
                                value={inputValues.firm}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form.Control
                                placeholder="PVN номер"
                                name="country"
                                onChange={handleChange}
                                value={inputValues.country}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Юридический адресс"
                                name="city"
                                onChange={handleChange}
                                value={inputValues.city}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form.Control
                                placeholder="Номер счёта"
                                name="address"
                                onChange={handleChange}
                                value={inputValues.address}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="SWIFT"
                                name="postCode"
                                onChange={handleChange}
                                value={inputValues.postCode}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form.Control
                                placeholder="Название банка"
                                name="phone"
                                onChange={handleChange}
                                value={inputValues.phone}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Инфо почта"
                                name="email"
                                onChange={handleChange}
                                value={inputValues.email}
                            />
                        </Col>
                    </Row>
                    <Button
                        variant={'success'}
                        className="mt-2 align-self-end"
                        onClick={ handleAdd }
                        disabled={!isFormValid}
                    >
                        Добавить менеджера
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddManagerModal;