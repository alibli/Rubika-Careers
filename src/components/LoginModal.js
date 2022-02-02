import ModalComponent from "./Core/ModalComponent";
import userService from '../Service/UserService';
import { Container, Row, Button } from 'react-bootstrap';
import toastService from "../Service/ToastService";
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Eye from "./Core/Eye";

function LoginModal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const [passInputType , setPassInputType] = useState('password');
    // const [eyeClass , setEyeClass] = useState('fa-eye');

    async function login(loginInfo) {
        try {
            const loginResponse = await userService.login(loginInfo);
            const { data } = loginResponse;
            if (data.administration_status) {
                userService.setUserInfo(data.token, 'ادمین');
            } else {
                userService.setUserInfo(data.token, data.first_name);
            }
            toastService.showToast('با موفقیت وارد شدید.', 'success');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                } else if (err.response.status === 406) {
                    toastService.showToast('ثبت نام کنید.', 'danger');
                } else {
                    console.log(err.response)
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

    const onSubmitLogin = (data) => {
        login(data);
    }

    // const togglePassword = () =>{
    //     if (passInputType === 'password') {
    //         setPassInputType('text');
    //         setEyeClass('fa-eye-slash')
    //     }
    //     else if (passInputType === 'text') {
    //         setPassInputType('password');
    //         setEyeClass('fa-eye')
    //     }
    // }

    const body =
        <form id="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
            <Container>
                <Row>
                    <label htmlFor='email'>
                        ایمیل
                    </label>
                    <input
                        className='modal-input'
                        name='email'
                        type='email'
                        {...register(
                            "email",
                            {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            }
                        )}
                    />
                    <div className="form-err">
                        {errors.email?.type === 'required' && "الزامی"}
                        {errors.email?.type === 'pattern' && "نامعتبر"}
                    </div>
                </Row>

                <Row>
                    <label htmlFor='password'>
                        رمزعبور
                    </label>
                    {/* <Eye></Eye> */}
                    {/* <div className="row"> */}
                        {/* <i className={`fa ${eyeClass} col-1 `} aria-hidden="true" onClick={togglePassword}></i> */}
                        <input
                            {...register(
                                "password",
                                {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                                }
                            )}
                            // className='modal-input col-11'
                            className='modal-input'
                            name='password'
                            type="password"
                        // type={passInputType} 
                        // id="passInput"  
                        />
                    {/* </div> */}

                    <div className="form-err">
                        {errors.password?.type === 'required' && "الزامی"}
                        {errors.password?.type === 'pattern' && "حداقل ۸ کارکتر از نمادهای @$%^*=+?& و حروف انگلیسی"}
                    </div>

                </Row>
            </Container>
        </form>;

    const footer = <>
        <div
            className='col-auto'>
            <Button
                variant="warning"
                type="submit"
                form="login-form">
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