import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type PropsType = {
    showRemove: boolean;
    setShowRemove:  React.Dispatch<React.SetStateAction<boolean>>;
    removeCancel: () => void;
    removeAccept: () => Promise<void>;
    title: string;
    text: string;
}

const RemoveModal = (props: PropsType) => {
    const { showRemove, setShowRemove, removeCancel, removeAccept, title, text } = props;

    return (
        <Modal
            centered
            show={ showRemove }
            onHide={ () => setShowRemove(false) }
        >
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { text }
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

export default RemoveModal;