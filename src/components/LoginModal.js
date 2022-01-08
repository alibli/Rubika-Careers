import ModalComponent from "./Core/ModalComponent";
import userService from '../Service/UserService';
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import toastService from "../Service/ToastService";
import { useNavigate } from 'react-router-dom';

function LoginModal(props) {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    async function userLogin() {
        try {
            const loginResponse = await userService.login(loginInfo);
            const { data } = loginResponse;
            if (data.isAdmin) {
                userService.setUserInfo(data.token, 'ادمین');
                navigate('/admin-panel');
            } else {
                userService.setUserInfo(data.token, data.first_name);
                navigate('/user-panel');
            }
            toastService.showToast('با موفقیت وارد شدید.', 'success');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
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
                onChange={(e) => {
                    setLoginInfo((prevState) => ({
                        ...prevState,
                        email: e.target.value
                    }))
                }}
            />
        </Row>

        <Row>
            <label htmlFor='password'>
                رمزعبور
            </label>
            <input
                className='modal-input'
                name='password'
                type='password'
                onChange={(e) => {
                    setLoginInfo((prevState) => ({
                        ...prevState,
                        password: e.target.value
                    }))
                }}
            />
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
            <Button
                variant="warning"
                onClick={() => {
                    userLogin();
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