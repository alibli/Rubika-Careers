import ModalComponent from "./Core/ModalComponent";
import userService from '../Service/UserService';
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import toastService from "../Service/ToastService";


function LoginModal(props) {

    const [loginBody, setlogin] = useState({
        email: '',
        password: '',
    });

    async function sendLogin(){
        try {
            const res = await userService.setUserLogin(loginBody);
            userService.setUserFirstname(res.data.first_name);
            userService.setUserToken(res.data.token);
        } catch (err) {
            console.log(err);
            toastService.showToast(err , 'danger');
        }
    }

    const body = <Container>
        <Row>
            <label htmlFor='email'>
                ایمیل
            </label>
            <input
                className='modal-input'
                name='email'
                type='email'
                value={loginBody.email} />
        </Row>

        <Row>
            <label htmlFor='password'>
                رمزعبور
            </label>
            <input
                className='modal-input'
                name='password'
                type='password' 
                value={loginBody.password}/>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
            <Button
                onClick={() => {
                    userService.login('token', 'علی')
                    props.onHide();
                }}>
                ورود
            </Button>
        </div>

        <div className='col-auto'>
            <p>
                ثبت‌نام نکرده‌اید؟
                <span
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={props.onSignupModalShow}>
                    {' '} ثبت‌نام کنید
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

export default LoginModal;