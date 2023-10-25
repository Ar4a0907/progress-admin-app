import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AiOutlineRollback } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';

import { fetchOneClient, removeOneManager } from '../http/clientsAPI';
import ManagerItem from '../components/ManagerItem';
import AddManagerModal from '../components/modals/AddManagerModal';
import { CLIENTS_ROUTE } from '../utils/consts';
import { useAppStore } from '../store/AppStore';
import { useRemoveItem } from '../hooks/useRemoveItem';
import RemoveModal from '../components/modals/RemoveModal';

export const OneClient = observer(() => {
    const { clientsStore } = useAppStore();
    const { CurrentClient, setCurrentClient } = clientsStore;

    const { id }  = useParams();

    const fetchCurrentClient = useCallback((id: string | undefined) => {
        if (id) {
            fetchOneClient(parseInt(id)).then(data => setCurrentClient(data));
        }
    },[setCurrentClient]);

    const [showAdd, setShowAdd] = useState(false);

    const {
        showRemove,
        setShowRemove,
        removeAccept,
        removeCancel,
        handleRemove,
    } = useRemoveItem(removeOneManager, () => fetchCurrentClient(id));

    useEffect(() => {
        fetchCurrentClient(id);
    },[id, fetchCurrentClient]);

    if(!CurrentClient) {
        return (
            <>
                <Container className="pt-5 pb-5">
                    <Button
                        style={{ width: 'fit-content' }}
                        className="d-flex justify-content-center align-items-center h-auto p-2 mb-4"
                        variant={ 'dark' }
                        title="Назад"
                        href={CLIENTS_ROUTE}
                    >
                        <AiOutlineRollback/>
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container className="pt-5 pb-5">
                <Button
                    style={{ width: 'fit-content' }}
                    className="d-flex justify-content-center align-items-center h-auto p-2 mb-4"
                    variant={ 'dark' }
                    title="Назад"
                    href={CLIENTS_ROUTE}
                >
                    <AiOutlineRollback/>
                </Button>

                <Row>
                    <Col>
                        <h2>{CurrentClient.name}</h2>
                        <Row className="mt-3 gap-2">
                            <Col md="auto">
                                <p className="text-secondary mb-0">Код предприятия:</p>
                                {CurrentClient.code}
                            </Col>
                            <Col md="auto">
                                <p className="text-secondary mb-0">PVN номер:</p>
                                {CurrentClient.pvn}
                            </Col>

                        </Row>
                        <Row className="mt-3 gap-2">
                            <Col md="auto">
                                <p className="text-secondary mb-0">Юридический адресс:</p>
                                {CurrentClient.address}
                            </Col>
                            <Col md="auto">
                                <p className="text-secondary mb-0">Номер счёта:</p>
                                {CurrentClient.accountNumber}
                            </Col>
                        </Row>
                        <Row className="mt-3 gap-2">
                            <Col md="auto">
                                <p className="text-secondary mb-0">SWIFT:</p>
                                {CurrentClient.swift}
                            </Col>
                            <Col md="auto">
                                <p className="text-secondary mb-0">Название банка:</p>
                                {CurrentClient.bank}
                            </Col>
                        </Row>
                        <Row className="mt-3 gap-2">
                            <Col md="auto">
                                <p className="text-secondary mb-0">Инфо почта:</p>
                                <a href={`mailto: ${CurrentClient.emailInfo}`}>{CurrentClient.emailInfo}</a>
                            </Col>
                            <Col md="auto">
                                <p className="text-secondary mb-0">Почта для счетов:</p>
                                <a href={`mailto: ${CurrentClient.emailInvoice}`}>{CurrentClient.emailInvoice}</a>
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
                                    onClick={() => setShowAdd(true)}
                                >
                                    Новый Менеджер
                                </Button>
                            </Col>
                        </Row>
                        {CurrentClient.managers?.map((manager) => (
                            <ManagerItem handleRemove={handleRemove} manager={manager} key={manager.id} />
                        ))}
                    </Col>
                    <Col>
                        Вторая сторона
                    </Col>
                </Row>
            </Container>
            <AddManagerModal
                fetchOneClient={fetchOneClient}
                setShowAdd={setShowAdd}
                showAdd={showAdd}
                clientId={id}
                setClient={setCurrentClient}
            />
            <RemoveModal
                showRemove={showRemove}
                setShowRemove={setShowRemove}
                removeCancel={removeCancel}
                removeAccept={removeAccept}
                text="Вы действительно хотите удалить менеджера без возможности вернуть его?"
                title="Удалить менеджера?"
            />
        </>
    );
});
