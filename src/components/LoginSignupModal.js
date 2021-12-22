import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function LoginSignupModal() {
    const [loginModalShow, setLoginModalShow] = useState(false);

    const [signupModalShow, setSignupModalShow] = useState(false);


    return (
        <div>
            <Button variant="primary" onClick={() => setLoginModalShow(true)}>
                Apply
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
