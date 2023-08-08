import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { useAppStore } from '../store/AppStore';
import { fetchClients, removeOneClient } from '../http/clientsAPI';
import ClientItem from '../components/ClientItem';
import AddClientModal from '../components/modals/AddClientModal';
import RemoveModal from '../components/modals/RemoveModal';
import { useRemoveItem } from '../hooks/useRemoveItem';

export const Clients = observer(() => {
    const { clientsStore } = useAppStore();
    const [showAdd, setShowAdd] = useState(false);
    const [removeName, setRemoveName] = useState<string | null>(null);

    const fetchAllClients = useCallback(() => {
        fetchClients().then(data => clientsStore.setClients(data));
    }, [clientsStore]);

    const {
        removeItem,
        showRemove,
        setShowRemove,
        removeAccept,
        removeCancel,
        handleRemove,
    } = useRemoveItem(removeOneClient, fetchAllClients);

    useEffect(() => {
        if (removeItem) {
            const targetClient = clientsStore.Clients.find(client => client.id === removeItem);
            if (targetClient) {
                setRemoveName(targetClient.name);
            }
        }
    }, [removeItem, clientsStore.Clients]);

    useEffect(() => {
        fetchAllClients();
    }, [fetchAllClients]);

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
                    <ClientItem key={item.id} item={item} handleRemove={handleRemove} />
                ))}
            </Container>

            <AddClientModal
                fetchAllClients={fetchAllClients}
                setShowAdd={setShowAdd}
                showAdd={showAdd}
            />

            <RemoveModal
                showRemove={showRemove}
                setShowRemove={setShowRemove}
                removeCancel={removeCancel}
                removeAccept={removeAccept}
                title={`Удалить клиента ${removeName}?`}
                text="Вы действительно хотите удалить клиента без возможности вернуть его?"
            />
        </>
    );
});
