import Modal from "./Core/Modal";

function SignupModal(props) {
    const buttons = [
        {
            label: 'ثبت‌نام',
            onClickHandler: () => {}
        }
    ]

    const rows = [
        {
            elements:
                <>
                    <label htmlFor='firstname'>
                        نام
                    </label>
                    <input
                        className='modal-input'
                        name='firstname'
                        type='text' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='lastname'>
                        نام خانوادگی
                    </label>
                    <input
                        className='modal-input'
                        name='lastname'
                        type='text' />
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
        },
        {
            elements:
                <>
                    <label htmlFor='password-confrim'>
                        تکرار رمزعبور
                    </label>
                    <input
                        className='modal-input'
                        name='password-confrim'
                        type='password' />
                </>
        }


    ]

    const bottom = [
        {
            elements:
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
        }
    ]

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            buttons={buttons}
            rows={rows}
            bottom={bottom} />
    );
}

export default SignupModal;