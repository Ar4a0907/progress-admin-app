import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaRegTrashCan } from 'react-icons/fa6';

import { Managers } from '../store/ClientsStore';

const ManagerItem = (props: { manager: Managers, handleRemove: (id: number) => Promise<void>}) => {
    const { manager, handleRemove } = props;

    return (
        <Card className="mt-2 mb-2">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            {manager.name}&nbsp;
                            <span
                                className="text-secondary"
                                style={{ fontWeight: 400, fontSize: '0.8em' }}
                            >
                                id: {manager.id}
                            </span>
                        </Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button
                            className="d-flex justify-content-center align-items-center h-auto p-2"
                            variant={ 'danger' }
                            title="Удалить менеджера"
                            onClick={ () => handleRemove(manager.id) }
                        >
                            <FaRegTrashCan/>
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-3 gap-2">
                    <Col>
                        <p className="text-secondary mb-0">Фирма:</p>
                        {manager.firm}
                    </Col>
                    <Col>
                        <p className="text-secondary mb-0">Страна:</p>
                        {manager.country}
                    </Col>
                    <Col>
                        <p className="text-secondary mb-0">Город:</p>
                        {manager.city}
                    </Col>
                </Row>
                <Row className="mt-3 gap-2">
                    <Col>
                        <p className="text-secondary mb-0">Адресс:</p>
                        {manager.address}
                    </Col>
                    <Col>
                        <p className="text-secondary mb-0">Почтовый код:</p>
                        {manager.postCode}
                    </Col>
                    <Col>
                        <p className="text-secondary mb-0">Номер телефона:</p>
                        <a href={`tel: ${manager.phone}`}>{manager.phone}</a>
                    </Col>

                </Row>
                <Row className="mt-3 gap-2">
                    <Col>
                        <p className="text-secondary mb-0">Электронная почта:</p>
                        <a href={`mailto: ${manager.email}`}>{manager.email}</a>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ManagerItem;