
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
function ModalDelete({ show, handleClose, handleConfirmDelete, dataModal }) {

    const handleShow = () => { };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Are you sure to delete user {dataModal.email}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;