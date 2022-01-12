import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import userService from "../Service/UserService";
import { useState } from "react";
import toastService from "../Service/ToastService";
import { useNavigate } from 'react-router-dom';

function SignupModal(props) {
    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    async function signup() {
        try {
            const signupRequestBody = {
                firstname: signupInfo.firstname,
                lastname: signupInfo.lastname,
                email: signupInfo.email,
                password: signupInfo.password
            }
            const signupResponse = await userService.signup(signupRequestBody);
            const { data, status } = signupResponse;
            if (status === 200) { //need this?
                toastService.showToast('ثبت‌نام شما با موفقیت انجام شد.', 'success');
                userService.setUserInfo(data.token, signupInfo.firstname);
                navigate('/user-panel');
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
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
                    onChange={(e) => {
                        setSignupInfo((prevState) => ({
                            ...prevState,
                            firstname: e.target.value
                        }))
                    }}
                />
            </Row>

            <Row>
                <label htmlFor='lastname'>
                    نام خانوادگی
                </label>
                <input
                    className='modal-input'
                    name='lastname'
                    type='text'
                    onChange={(e) => {
                        setSignupInfo((prevState) => ({
                            ...prevState,
                            lastname: e.target.value
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
                        setSignupInfo((prevState) => ({
                            ...prevState,
                            password: e.target.value
                        }))
                    }}
                />
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
                        onChange={(e) => {
                            setSignupInfo((prevState) => ({
                                ...prevState,
                                passwordConfirm: e.target.value
                            }))
                        }}
                    />
                </>
            </Row>
        </Container>;

    const footer =
        <>
            <div
                className='col-auto'>
                <Button
                    onClick={signup}
                    variant="warning">
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
                        onClick={props.onLoginModalShow}>
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