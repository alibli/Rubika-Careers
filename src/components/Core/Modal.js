import { Modal, Container, Row, Button } from 'react-bootstrap';
import '../../styles/Modal.css';

function LoginModalComponent(props) {
    return (
        <Modal
            {...props}
            size="sm">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container>
                   {props.rows.map((row, index) => (
                       <Row key={index}>
                           {row.elements}
                       </Row>
                   ))}
                </Container>
            </Modal.Body>

            <Modal.Footer className='row flex-column justify-content-center'>
                <div 
                className='col-auto'>
                    {props.buttons.map(button => (
                        <Button
                            onClick={props.onHide}
                            key={button.label}>
                            {button.label}
                        </Button>
                    ))}
                </div>

                <div className='col-auto'>
                    {props.bottom.map((item, index) => (
                        <div key={index}> 
                            {item.elements}
                        </div>
                    ))}
                </div>

            </Modal.Footer>

        </Modal>
    );
}

export default LoginModalComponent;
