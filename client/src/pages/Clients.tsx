import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { useAppStore } from '../store/AppStore';
import { fetchClients, removeOneClient } from '../http/clientsAPI';
import ClientItem from '../components/ClientItem';
import RemoveClientModal from '../components/modals/RemoveClientModal';
import AddClientModal from '../components/modals/AddClientModal';

export const Clients = observer(() => {
    const { clientsStore } = useAppStore();
    const [removeClient, setRemoveClient] = useState<null| {id: number, name: string}>(null);
    const [showRemove, setShowRemove] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const fetchAllClients = useCallback(() => {
        fetchClients().then(data => clientsStore.setClients(data));
    }, [clientsStore]);

    const handleRemove = async (id: number, name: string) => {
        setRemoveClient({ id, name });
        setShowRemove(true);
    };

    const removeAccept = async () => {
        if (removeClient) {
            await removeOneClient(removeClient.id);
        }
        fetchAllClients();
        setRemoveClient(null);
        setShowRemove(false);
    };

    const removeCancel = () => {
        setRemoveClient(null);
        setShowRemove(false);
    };

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

            <RemoveClientModal
                showRemove={showRemove}
                setShowRemove={setShowRemove}
                removeClient={removeClient}
                removeCancel={removeCancel}
                removeAccept={removeAccept}
            />
        </>
    );
});
