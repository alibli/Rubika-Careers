import Modal from "./Core/Modal";

function LoginModal(props) {
    // const buttons = [
    //     {
    //         label: 'login'
    //     }
    // ]

    // const rows = [
    //     {
    //         elements:
    //             <>
    //                 <label htmlFor='email'>
    //                     ایمیل
    //                 </label>
    //                 <input
    //                     className='modal-input'
    //                     name='email'
    //                     type='email' />
    //             </>
    //     },
    //     {
    //         elements:
    //             <>
    //                 <label htmlFor='password'>
    //                     رمزعبور
    //                 </label>
    //                 <input
    //                     className='modal-input'
    //                     name='password'
    //                     type='password' />
    //             </>
    //     }

    // ]
    return (
        <div className="login-modal">
            <Modal
                show={props.modalShow}
                onHide={props.onHide} />
        </div>
    );
}

export default LoginModal;