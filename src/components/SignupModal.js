import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import userService from "../Service/UserService";
import toastService from "../Service/ToastService";

function SignupModal(props) {

    
    const [signpBody , setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
    });

    async function sendSignup(){
        const res = await userService.setUserSignup(signpBody.firstName , signpBody.lastName , signpBody.email , signpBody.password);
        try{
            if(signpBody.password === signpBody.confirm){
              userService.setUserToken(res.data); //token
            }
        }
        catch(err){
            console.log(err);
            toastService.showToast(res.data , 'danger');
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
                value={signpBody.firstName}/>
        </Row>

        <Row>
            <label htmlFor='lastname'>
                نام خانوادگی
            </label>
            <input
                className='modal-input'
                name='lastname'
                type='text' 
                value={signpBody.lastName}/>
        </Row>

        <Row>

            <label htmlFor='password'>
                رمزعبور
            </label>
            <input
                className='modal-input'
                name='password'
                type='password' 
                value={signpBody.password}/>
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
                    value={signpBody.confirm}/>
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