import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/LoginSignupModal.css'

function LoginSignupModal(props) {
    const [loginModalShow, setLoginModalShow] = useState(false);

    const [signupModalShow, setSignupModalShow] = useState(false);


    return (
        <div className='login-signup-modal'>
            <Button
                className='btn'
                variant={props.variant}
                id={props.id}
                onClick={() => setLoginModalShow(true)}>
                {props.buttonLabel}
            </Button>

            <LoginModal
                show={loginModalShow}
                onHide={() => setLoginModalShow(false)}
                onSignupModalShow={() => {
                    setLoginModalShow(false);
                    setSignupModalShow(true);
                }} />

            <SignupModal
                show={signupModalShow}
                onHide={() => setSignupModalShow(false)}
                onLoginModalShow={() => {
                    setSignupModalShow(false);
                    setLoginModalShow(true);
                }} />
        </div >
    );
}

export default LoginSignupModal;
