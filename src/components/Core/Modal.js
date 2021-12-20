import { Modal, Container, Row, Button } from 'react-bootstrap';
// import './LoginModalComponent.css';

function LoginModalComponent(props) {
    return (
        <Modal
            {...props}
            size="sm">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <label htmlFor='email'>
                            ایمیل
                        </label>
                        <input
                            className='modal-input'
                            name='email'
                            type='email' />
                    </Row>
                    <Row>
                        <label htmlFor='password'>
                            رمزعبور
                        </label>
                        <input
                            className='modal-input'
                            name='password'
                            type='password' />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className='row justify-content-center'>
                    <div className='col-auto'>
                        <Button
                            onClick={props.onHide}
                            className='login-button'>
                            ورود
                        </Button>
                    </div>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModalComponent;
