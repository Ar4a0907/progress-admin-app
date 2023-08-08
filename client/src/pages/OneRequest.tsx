import React, { useCallback, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AiOutlineRollback } from 'react-icons/ai';

import { fetchOneRequest } from '../http/requestsAPI';
import { useAppStore } from '../store/AppStore';
import RequestItem from '../components/RequestItem';
import { REQUESTS_ROUTE } from '../utils/consts';


const OneRequest = observer(() => {
    const { id }  = useParams();
    const { requestStore } = useAppStore();
    const { setCurrentRequest, CurrentRequest } = requestStore;

    const fetchCurrentRequest = useCallback(() => {
        if (id) {
            fetchOneRequest(id).then(data => setCurrentRequest(data));
        }
    }, [id, setCurrentRequest]);

    useEffect(() => {
        fetchCurrentRequest();

        return () => { setCurrentRequest(null); };
    }, [fetchCurrentRequest, setCurrentRequest]);

    return (
        <Container className="pt-5 pb-5">
            <Button
                style={{ width: 'fit-content' }}
                className="d-flex justify-content-center align-items-center h-auto p-2 mb-4"
                variant={ 'dark' }
                title="Назад"
                href={REQUESTS_ROUTE}
            >
                <AiOutlineRollback/>
            </Button>
            {
                CurrentRequest &&
                <RequestItem item={CurrentRequest}/>
            }
        </Container>
    );
});

export default OneRequest;