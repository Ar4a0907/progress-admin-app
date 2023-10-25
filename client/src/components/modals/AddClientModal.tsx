import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { createClient } from '../../http/clientsAPI';
import { Client } from '../../store/ClientsStore';

type PropsType = {
    fetchAllClients: () => void;
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
    showAdd: boolean;
}

const AddClientModal = (props: PropsType) => {
    const { fetchAllClients, setShowAdd, showAdd } = props;
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputValues, setInputValue] = useState({
        name: '',
        code: '',
        pvn: '',
        address: '',
        accountNumber: '',
        swift: '',
        bank: '',
        emailInfo: '',
        emailInvoice: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputValue(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAdd = async () => {
        await createClient(inputValues as Client);
        fetchAllClients();
        setInputValue({
            name: '',
            code: '',
            pvn: '',
            address: '',
            accountNumber: '',
            swift: '',
            bank: '',
            emailInfo: '',
            emailInvoice: '',
        });
        setShowAdd(false);
    };

    useEffect(() => {
        let boolean = true;
        for (const [, value] of Object.entries(inputValues)) {
            if (value.trim() === '') {
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
    );
};

export default AddClientModal;