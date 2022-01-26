import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import userService from "../Service/UserService";
import toastService from "../Service/ToastService";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Eye from "./Core/Eye";
import {useState} from 'react';
function SignupModal(props) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const [eyeClass, setEyeClass] = useState('fa-eye');
    const [passInputType, setPassInputType] = useState('password');
    const [repeatEyeClass, setRepeatEyeClass] = useState('fa-eye');
    const [repeatPassInputType, setRepeatPassInputType] = useState('password');

    const navigate = useNavigate();

    const signup = async (data) => {
        const signupRequestBody = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        }

        try {
            const signupResponse = await userService.signup(signupRequestBody);
            const { data, status } = signupResponse;
            if (status === 200) {
                toastService.showToast('ثبت‌نام شما با موفقیت انجام شد.', 'success');
                userService.setUserInfo(data.token, signupRequestBody.firstname);
                navigate('/user-panel');
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }


    const togglePassword = () => {
        if (passInputType === 'password') {
            setPassInputType('text');
            setEyeClass('fa-eye-slash')
        }
        else if (passInputType === 'text') {
            setPassInputType('password');
            setEyeClass('fa-eye')
        }

    }
    const toggleRepeatPass = () => {
        if (repeatPassInputType === 'password') {
            setRepeatPassInputType('text');
            setRepeatEyeClass('fa-eye-slash')
        }
        else if (repeatPassInputType === 'text') {
            setRepeatPassInputType('password');
            setRepeatEyeClass('fa-eye')
        }

    }

    const body =
        <form id="signup-form" onSubmit={handleSubmit(signup)}>
            <Container>
                <Row>
                    <label htmlFor='firstname'>
                        نام
                    </label>
                    <input
                        className='modal-input'
                        name='firstname'
                        type='text'
                        {...register(
                            "firstname",
                            {
                                required: true,
                                maxLength: 50,
                                // pattern: /^[\u0600-\u06FF\s]+$/
                            }
                        )}
                    />
                    <div className="form-err">
                        {errors.firstname?.type === 'required' && "الزامی"}
                        {errors.firstname?.type === 'maxLength' && "نام کوتاه تری وارد کنید"}
                        {/* {errors.firstname?.type === 'pattern' && "فارسی تایپ کنید"} */}
                    </div>
                </Row>

                <Row>
                    <label htmlFor='lastname'>
                        نام خانوادگی
                    </label>
                    <input
                        className='modal-input'
                        name='lastname'
                        type='text'
                        {...register(
                            "lastname",
                            {
                                required: true,
                                maxLength: 80,
                                // pattern: /^[\u0600-\u06FF\s]+$/
                            }
                        )}
                    />
                    <div className="form-err">
                        {errors.lastname?.type === 'required' && "الزامی"}
                        {errors.lastname?.type === 'maxLength' && "نام کوتاه تری وارد کنید"}
                        {/* {errors.lastname?.type === 'pattern' && "فارسی تایپ کنید"} */}
                    </div>
                </Row>

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
                    <i className={`fa ${eyeClass} col-1 `} aria-hidden="true" onClick={togglePassword}></i>
                    <input
                        className='modal-input col-11'
                        name='password'
                        type={passInputType}
                        {...register(
                            "password",
                            {
                                required: true,
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                            }
                        )}

                    />
                    <div className="form-err">
                        {errors.password?.type === 'required' && "الزامی"}
                        {errors.password?.type === 'pattern' && "حداقل ۸ کارکتر از حروف و اعداد انگلیسی"}
                    </div>
                </Row>

                <Row>
                    <>
                        <label htmlFor='passwordConfrim'>
                            تکرار رمزعبور
                        </label>
                        <i className={`fa ${repeatEyeClass} col-1 `} aria-hidden="true" onClick={toggleRepeatPass}></i>
                        <input
                            className='modal-input col-11'
                            name='passwordConfrim'
                            type={repeatPassInputType}
                            {...register(
                                "passwordConfirm",
                                {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    validate: (value) => value === watch('password')
                                }
                            )}
    
                        />
                        <div className="form-err">
                            {errors.passwordConfirm?.type === 'required' && "الزامی"}
                            {errors.passwordConfirm?.type === 'pattern' && "حداقل ۸ کارکتر از حروف و اعداد انگلیسی"}
                            {errors.passwordConfirm?.type === 'validate' && "عدم مطابقت با رمز عبور"}

                        </div>
                    </>
                </Row>
            </Container>
        </form>;

    const footer =
        <>
            <div
                className='col-auto'>
                <Button
                    type="submit"
                    form="signup-form"
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