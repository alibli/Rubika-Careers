import Modal from "./Core/Modal";
import userService from '../Service/UserService';

function LoginModal(props) {

    const buttons = [
        {
            label: 'ورود',
            onClickHandler: () => {
                userService.login('token', 'علی')
                props.onHide();
            }
        }
    ]

    const rows = [
        {
            elements:
                <>
                    <label htmlFor='email'>
                        ایمیل
                    </label>
                    <input
                        className='modal-input'
                        name='email'
                        type='email' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='password'>
                        رمزعبور
                    </label>
                    <input
                        className='modal-input'
                        name='password'
                        type='password' />
                </>
        }

    ]

    const bottom = [
        {
            elements:
                <p>
                    ثبت‌نام نکرده‌اید؟
                    <span
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={props.onSignupModalShow}
                    >
                        {' '} ثبت‌نام کنید
                    </span>
                </p>
        }
    ]

    return (
        <Modal
            size="sm"
            show={props.show}
            onHide={props.onHide}
            buttons={buttons}
            rows={rows}
            bottom={bottom} />
    );
}

export default LoginModal;