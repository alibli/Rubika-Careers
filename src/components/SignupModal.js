import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import userService from "../Service/UserService";
import { useState } from "react";
import toastService from "../Service/ToastService";

function SignupModal(props) {

    const [signupInfo, setSignupInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    function userSignup() {
        const response = userService.signup(signupInfo);
        response
            .then((response) => {
                if (response.status === 200) {
                    toastService.showToast('ثبت‌نام شما با موفقیت انجام شد.', 'success');
                    userService.setUserInfo(response.data.token, signupInfo.first_name);
                }
            }).catch((err) => {
                toastService.showToast(err.message, 'danger');
            });
    }


    // async function sendSignup2() {
    //     try {
    //         const model = { ...signupInfo };
    //         delete model.confirm;
    //         const res = await userService.setUserSignup2({ body: model, method: 'post', url: '/user/register' });
    //         if (signupInfo.password === signupInfo.confirm) { //validation..
    //             userService.setUserToken(res.data.token); //token
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //         toastService.showToast(err, 'danger');
    //     }
    // }


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
                            first_name: e.target.value
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
                            last_name: e.target.value
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
                    onClick={userSignup}
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