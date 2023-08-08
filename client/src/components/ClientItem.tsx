import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaRegTrashCan } from 'react-icons/fa6';

import { Client } from '../store/ClientsStore';
import { CLIENTS_ROUTE } from '../utils/consts';

const ClientItem = (props: { item: Client; handleRemove: (id: number, name: string) => Promise<void> }) => {
    const { item, handleRemove } = props;

    return (
        <Card className="mt-2">
            <Card.Body>
                <Row className="align-items-center mb-2">
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
                                <a href={`mailto: ${item.emailInfo}`}>{item.emailInfo}</a>
                            </Col>
                            <Col>
                                <p className="text-secondary mb-0">Почта для счетов:</p>
                                <a href={`mailto: ${item.emailInvoice}`}>{item.emailInvoice}</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="auto">
                        <Button
                            className="d-flex justify-content-center align-items-center h-auto p-2"
                            variant={ 'danger' }
                            onClick={ () => handleRemove(item.id, item.name) }
                            title="Удалить клиента"
                        >
                            <FaRegTrashCan/>
                        </Button>
                    </Col>
                </Row>
                <Card.Link href={`${CLIENTS_ROUTE}/${item.id}`}>Подробнее</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default ClientItem;