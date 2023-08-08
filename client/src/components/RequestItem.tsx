import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { RequestType } from '../store/RequestStore';
import { convertDate } from '../utils/convertDate';
import { REQUESTS_ROUTE } from '../utils/consts';

import RequestRowItem from './RequestRowItem';

const RequestItem = (props: {item: RequestType, small?: boolean}) => {
    const { item, small } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(REQUESTS_ROUTE + `/${item.id}`);
    };

    if (small === true) {
        return (
            <Card className="mt-2" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <p><strong>Номер:</strong> {item.id}</p>
                        </Col>
                        <Col>
                            <p>
                                <strong>Клиент:</strong> {item.manager?.client?.name}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <p><strong>Дата:</strong> {convertDate(item.updatedAt)}</p>
                        </Col>
                        <Col>
                            <p>
                                <strong>Менеджер:</strong> {item.manager?.name}
                            </p>
                        </Col>
                    </Row>
                    <p className="mb-0"><strong>Примичание:</strong> {item.description}</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Row>
                    <Col>
                        <p className="mb-2">
                            <strong>Клиент:</strong> {item.manager?.client?.name}
                        </p>
                        <p className="mb-2">
                            <strong>Менеджер:</strong> {item.manager?.name}
                        </p>
                    </Col>
                    <Col md="auto">
                        <p className="mb-2">
                            <strong>Номер предложения:</strong> {item.id}
                        </p>
                        <p className="mb-2">
                            <strong>Применять PVN:</strong> {item.pvn ? 'Да' : 'Нет'}
                        </p>
                    </Col>
                </Row>
                <p className="mb-2"><strong>Примичание:</strong> {item.description}</p>
                {
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Артикуль</th>
                                <th>Примечание</th>
                                <th>Кол-во</th>
                                <th>Цена [1шт]</th>
                                <th>Скидка</th>
                                <th>Итог</th>
                                <th>Чертёж</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.requestRows.map((item, index) => (
                                <RequestRowItem key={item.id} requestRow={item} index={index}/>
                            ))}
                        </tbody>
                    </Table>
                }
                <Row className="justify-content-end">
                    <Col>
                        <strong>Дата:</strong> {convertDate(item.updatedAt)}
                    </Col>
                    <Col md="auto">
                        <p className="mb-1">
                            <strong>Сумма:</strong> {item.sum}
                        </p>
                        <p className="mb-1">
                            <strong>Скидка:</strong> {item.discount}
                        </p>
                        <p className="mb-1">
                            <strong>Итог:</strong> {item.total}
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RequestItem;