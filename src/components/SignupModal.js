import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';

function SignupModal(props) {

    const body = 
    <Container>
        <Row>
            <label htmlFor='firstname'>
                نام
            </label>
            <input
                className='modal-input'
                name='firstname'
                type='text' />
        </Row>

        <Row>
            <label htmlFor='lastname'>
                نام خانوادگی
            </label>
            <input
                className='modal-input'
                name='lastname'
                type='text' />
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

        <Row>
            <>
                <label htmlFor='password-confrim'>
                    تکرار رمزعبور
                </label>
                <input
                    className='modal-input'
                    name='password-confrim'
                    type='password' />
            </>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
                <Button>
                    ثبت‌نام
                </Button>
        </div>

        <div className='col-auto'>
            <p>
                قبلاً ثبت‌نام کرده‌اید؟
                <span
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={props.onSignupModalShow}>
                    {' '} وارد شوید
                </span>
            </p>
        </div>
    </>;

    return (
        <ModalComponent
            size="sm"
            body={body}
            footer={footer}
            show={props.show}
            onHide={props.onHide} />
    );
}

export default SignupModal;