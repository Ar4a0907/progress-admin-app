import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaRegTrashCan } from 'react-icons/fa6';
import { observer } from 'mobx-react-lite';

import { User } from '../store/UserStore';
import { useAppStore } from '../store/AppStore';

const UserItem = observer((props: {item: User, handleRemove: (id: number) => Promise<void>}) => {
    const { item, handleRemove } = props;
    const { userStore } = useAppStore();

    return (
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
    );
});

export default UserItem;