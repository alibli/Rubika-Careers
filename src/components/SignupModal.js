import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import userService from "../Service/UserService";
import { useState } from "react";
import toastService from "../Service/ToastService";

function SignupModal(props) {


    const [signupBody, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
    });

    async function sendSignup() {
        try {
            
            const res = await userService.setUserSignup(signupBody);
            if (signupBody.password === signupBody.confirm) { //validation..
                userService.setUserToken(res.data.token); //token
            }
        }
        catch (err) {
            console.log(err);
            toastService.showToast(err, 'danger');
        }
    }


    async function sendSignup2() {
        try {
            const model = { ...signupBody };
            delete model.confirm;
            const res = await userService.setUserSignup2({body: model , method: 'post' , url : '/user/register' });
            if (signupBody.password === signupBody.confirm) { //validation..
                userService.setUserToken(res.data.token); //token
            }
        }
        catch (err) {
            console.log(err);
            toastService.showToast(err, 'danger');
        }
    }


    const body =
        <Container>
            <Row>
                <label htmlFor='firstname'>
                    نام
                </label>
                <input
                    className='modal-input'
                    name='firstname'
                    type='text'
                    value={signupBody.firstName} />
            </Row>

            <Row>
                <label htmlFor='lastname'>
                    نام خانوادگی
                </label>
                <input
                    className='modal-input'
                    name='lastname'
                    type='text'
                    value={signupBody.lastName} />
            </Row>

            <Row>

                <label htmlFor='password'>
                    رمزعبور
                </label>
                <input
                    className='modal-input'
                    name='password'
                    type='password'
                    value={signupBody.password} />
            </Row>

            <Row>
                <>
                    <label htmlFor='password-confrim'>
                        تکرار رمزعبور
                    </label>
                    <input
                        className='modal-input'
                        name='password-confrim'
                        type='password'
                        value={signupBody.confirm} />
                </>
            </Row>
        </Container>;

    const footer =
        <>
            <div
                className='col-auto'>
                <Button onClick={sendSignup}>
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