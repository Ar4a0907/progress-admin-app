import React, { useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '../store/AppStore';
import { fetchRequests } from '../http/requestsAPI';
import RequestItem from '../components/RequestItem';

const Requests = observer(() => {
    const { requestStore } = useAppStore();
    const { setRequests, Requests } = requestStore;

    const fetchAllRequests = useCallback(() => {
        fetchRequests().then(data => setRequests(data));
    }, [setRequests]);

    useEffect(() => {
        fetchAllRequests();
    }, [fetchAllRequests]);

    return (
        <Container className="pt-5 pb-5">
            <Row className="mb-4 flex-row">
                <Col><h2>Запросы</h2></Col>
            </Row>
            {Requests.map(item => (
                <RequestItem key={item.id} item={item} small/>
            ))}

        </Container>
    );
});

export default Requests;