import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';

export const Clients = observer(() => {


    return (
        <Container className="pt-5 pb-5">
            <h2 className="mb-4">Клиенты</h2>
        </Container>
    );
});
