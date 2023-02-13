import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { IModal } from '../../utils/models';

const CusModal = ({show, setShow}: IModal): React.ReactElement => {
  const handleClose = () => {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CusModal