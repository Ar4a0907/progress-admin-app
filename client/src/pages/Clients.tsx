import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { FaRegTrashCan } from "react-icons/fa6";

import { useAppStore } from '../store/AppStore';
import { createClient, fetchClients, removeOneClient } from '../http/clientsAPI';
import { Client } from "../store/ClientsStore";

export const Clients = observer(() => {
    const { clientsStore } = useAppStore();
    const [removeClient, setRemoveClient] = useState<null|number>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [inputValues, setInputValue] = useState({
        name: "",
        code: "",
        pvn: "",
        address: "",
        accountNumber: "",
        swift: "",
        bank: "",
        emailInfo: "",
        emailInvoice: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputValue(current => ({ ...current, [name]: value }));
    }

    useEffect(() => {
        let boolean = true;
        for (const [key, value] of Object.entries(inputValues)) {
            if (value.trim() === '') {
                boolean = false;
            }
        }

        setIsFormValid(boolean);
    }, [inputValues])

    const handleAdd = async () => {
        await createClient(inputValues as Client)
        setInputValue({
            name: "",
            code: "",
            pvn: "",
            address: "",
            accountNumber: "",
            swift: "",
            bank: "",
            emailInfo: "",
            emailInvoice: "",
        });
        setShowAdd(false);
        window.location.reload();
    }

    const handleRemove = async (id: number) => {
        setRemoveClient(id);
        setShowRemove(true);
    }

    const removeAccept = async () => {
        if (removeClient) {
            await removeOneClient(removeClient);
        }
        setRemoveClient(null);
        setShowRemove(false);
        window.location.reload();
    }

    const removeCancel = () => {
        setRemoveClient(null);
        setShowRemove(false);
    }

    useEffect(() => {
        fetchClients().then(data => clientsStore.setClients(data));
    }, [clientsStore]);

    return (
        <>
            <Container className="pt-5 pb-5">
                <Row className="mb-4 flex-row">
                    <Col><h2>Клиенты</h2></Col>
                    <Col md="auto">
                        <Button
                            style={{ width: 'fit-content' }}
                            variant={ 'outline-success' }
                            onClick={ () => setShowAdd(true) }
                        >
                            Новый Клиент
                        </Button>
                    </Col>
                </Row>

                {clientsStore.Clients.map((item) => (
                    <Card className="mt-2" key={item.id}>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col>
                                    <Card.Title>
                                        {item.name}&nbsp;
                                        <span
                                            className="text-secondary"
                                            style={{ fontWeight: 400, fontSize: '0.8em' }}
                                        >
                                            id: {item.id}
                                        </span>
                                    </Card.Title>
                                    <Row className="mt-3">
                                        <Col>
                                            <p className="text-secondary mb-0">Код предприятия:</p>
                                            {item.code}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">PVN номер:</p>
                                            {item.pvn}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">Юридический адресс:</p>
                                            {item.address}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">Номер счёта:</p>
                                            {item.accountNumber}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <p className="text-secondary mb-0">SWIFT:</p>
                                            {item.swift}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">Название банка:</p>
                                            {item.bank}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">Инфо почта:</p>
                                            {item.emailInfo}
                                        </Col>
                                        <Col>
                                            <p className="text-secondary mb-0">Почта для счетов:</p>
                                            {item.emailInvoice}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        className="d-flex justify-content-center align-items-center h-auto p-2"
                                        variant={ 'danger' }
                                        onClick={ () => handleRemove(item.id) }
                                        title="Удалить клиента"
                                    >
                                        <FaRegTrashCan/>
                                    </Button>
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
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить нового клиента:</Modal.Title>
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
                                    name="code"
                                    onChange={handleChange}
                                    value={inputValues.code}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    placeholder="PVN номер"
                                    name="pvn"
                                    onChange={handleChange}
                                    value={inputValues.pvn}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Юридический адресс"
                                    name="address"
                                    onChange={handleChange}
                                    value={inputValues.address}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    placeholder="Номер счёта"
                                    name="accountNumber"
                                    onChange={handleChange}
                                    value={inputValues.accountNumber}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="SWIFT"
                                    name="swift"
                                    onChange={handleChange}
                                    value={inputValues.swift}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    placeholder="Название банка"
                                    name="bank"
                                    onChange={handleChange}
                                    value={inputValues.bank}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Инфо почта"
                                    name="emailInfo"
                                    onChange={handleChange}
                                    value={inputValues.emailInfo}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    placeholder="Почта для счетов"
                                    name="emailInvoice"
                                    onChange={handleChange}
                                    value={inputValues.emailInvoice}
                                />
                            </Col>
                            <Col></Col>
                        </Row>
                        <Button
                            variant={'success'}
                            className="mt-2 align-self-end"
                            onClick={ handleAdd }
                            disabled={!isFormValid}
                        >
                            Добавить клиента
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
                    <Modal.Title>Удалить клиента?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить клиента без возможности вернуть его?
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
