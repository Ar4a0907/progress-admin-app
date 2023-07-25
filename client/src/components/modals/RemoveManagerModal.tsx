import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type PropsType = {
    showRemove: boolean;
    setShowRemove:  React.Dispatch<React.SetStateAction<boolean>>;
    removeCancel: () => void;
    removeAccept: () => Promise<void>;
}

const RemoveManagerModal = (props: PropsType) => {
    const { showRemove, setShowRemove, removeCancel, removeAccept } = props;
    return (
        <Modal
            centered
            show={ showRemove }
            onHide={ () => setShowRemove(false) }
        >
            <Modal.Header closeButton>
                <Modal.Title>Удалить менеджера?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы действительно хотите удалить менеджера без возможности вернуть его?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ removeCancel }>
                    Нет
                </Button>
                <Button variant="danger" onClick={ removeAccept }>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveManagerModal;