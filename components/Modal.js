import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Buka Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contoh Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Isi dari modal...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
