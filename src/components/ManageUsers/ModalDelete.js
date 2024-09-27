
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
function ModalDelete({ show, handleClose, handleConfirmDelete, dataModal }) {

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
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;