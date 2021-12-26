import { Modal } from 'react-bootstrap';
import '../../styles/ModalComponent.css';

function ModalComponent(props) {
    const { size, body, footer } = props;

    return (
        <Modal
            {...props}
            size={size}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                { body }
            </Modal.Body>

            <Modal.Footer className='row flex-column justify-content-center'>
                { footer }
            </Modal.Footer>

        </Modal>
    );
}

export default ModalComponent;
