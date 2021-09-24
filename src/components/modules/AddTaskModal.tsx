import { Modal, Form } from 'react-bootstrap';
import { Button } from '../elements';

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function AddTaskModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form.Label>Краткое описание</Form.Label>
        <Form.Control type="text" name="title" required />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="blue">Создать</Button>
      </Modal.Footer>
    </Modal>
  );
}
