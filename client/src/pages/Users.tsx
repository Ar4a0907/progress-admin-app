import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '../store/AppStore';
import { fetchUsers, removeOneUser } from '../http/userAPI';
import { User } from '../store/UserStore';
import UserItem from '../components/UserItem';
import AddUserModal from '../components/modals/AddUserModal';
import { useRemoveItem } from '../hooks/useRemoveItem';
import RemoveModal from '../components/modals/RemoveModal';

const Users = observer(() => {
    const { userStore } = useAppStore();
    const [showAdd, setShowAdd] = useState(false);

    const fetchAllUsers = useCallback(() => {
        fetchUsers().then(data => {
            userStore.setAllUsers(data);
            const currentUserIndex = data.findIndex((item : User) => item.id === userStore.User.id);
            if (currentUserIndex !== -1) {
                const currentUser = data.splice(currentUserIndex, 1)[0];
                data.unshift(currentUser);
                userStore.setAllUsers(data);
            }
        });
    }, [userStore]);

    const {
        showRemove,
        setShowRemove,
        removeAccept,
        removeCancel,
        handleRemove,
    } = useRemoveItem(removeOneUser, fetchAllUsers);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <>
            <Container className="pt-5 pb-5">
                <Row className="mb-4 flex-row">
                    <Col><h2 className="mb-4">Пользователи</h2></Col>
                    <Col md="auto">
                        <Button
                            style={{ width: 'fit-content' }}
                            variant={ 'outline-success' }
                            onClick={ () => setShowAdd(true) }
                        >
                            Новый пользователь
                        </Button>
                    </Col>
                </Row>
                {userStore.AllUsers.map((item) => (
                    <UserItem
                        key={item.id}
                        item={item}
                        handleRemove={handleRemove}
                    />
                ))}
            </Container>
            <AddUserModal
                fetchAllUsers={ fetchAllUsers }
                setShowAdd={ setShowAdd }
                showAdd={ showAdd }
            />
            <RemoveModal
                showRemove={showRemove}
                setShowRemove={setShowRemove}
                removeCancel={removeCancel}
                removeAccept={removeAccept}
                title="Удалить пользователя?"
                text="Вы действительно хотите удалить пользователя без возможности вернуть его?"
            />
        </>
    );
});

export default Users;