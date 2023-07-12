import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { fetchOneClient } from '../http/clientsAPI';
import { Client } from '../store/ClientsStore';
import ManagerItem from '../components/ManagerItem';

export const OneClient = () => {
    const [client, setClient] = useState<Client>({
        accountNumber: '',
        address: '',
        bank: '',
        code: '',
        emailInfo: '',
        emailInvoice: '',
        id: -1,
        name: '',
        pvn: '',
        swift: '',
    });

    const { id }  = useParams();

    useEffect(() => {
        if (id) {
            fetchOneClient(parseInt(id)).then(data => setClient(data));
        }
    },[id]);

    return (
        <Container className="pt-5 pb-5">
            <Row>
                <Col>
                    <h2>{client.name}</h2>
                    <Row className="mt-3 gap-2">
                        <Col md="auto">
                            <p className="text-secondary mb-0">Код предприятия:</p>
                            {client.code}
                        </Col>
                        <Col md="auto">
                            <p className="text-secondary mb-0">PVN номер:</p>
                            {client.pvn}
                        </Col>

                    </Row>
                    <Row className="mt-3 gap-2">
                        <Col md="auto">
                            <p className="text-secondary mb-0">Юридический адресс:</p>
                            {client.address}
                        </Col>
                        <Col md="auto">
                            <p className="text-secondary mb-0">Номер счёта:</p>
                            {client.accountNumber}
                        </Col>
                    </Row>
                    <Row className="mt-3 gap-2">
                        <Col md="auto">
                            <p className="text-secondary mb-0">SWIFT:</p>
                            {client.swift}
                        </Col>
                        <Col md="auto">
                            <p className="text-secondary mb-0">Название банка:</p>
                            {client.bank}
                        </Col>
                    </Row>
                    <Row className="mt-3 gap-2">
                        <Col md="auto">
                            <p className="text-secondary mb-0">Инфо почта:</p>
                            <a href={`mailto: ${client.emailInfo}`}>{client.emailInfo}</a>
                        </Col>
                        <Col md="auto">
                            <p className="text-secondary mb-0">Почта для счетов:</p>
                            <a href={`mailto: ${client.emailInvoice}`}>{client.emailInvoice}</a>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-4">
                        <Col>
                            <h3>Менеджеры</h3>
                        </Col>
                        <Col md="auto">
                            <Button
                                style={{ width: 'fit-content' }}
                                variant={ 'outline-success' }
                            >
                                Новый Менеджер
                            </Button>
                        </Col>
                    </Row>
                    {client.managers?.map((manager) => (
                        <ManagerItem manager={manager} key={manager.id} />
                    ))}
                </Col>
                <Col>
                    Вторая сторона
                </Col>
            </Row>
        </Container>
    );
};
