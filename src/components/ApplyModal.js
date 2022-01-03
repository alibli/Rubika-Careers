import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import apiService from "../Service/APIService";
import Notification from "./Core/Notification";

function ApplyModal(props) {

    const apiTest = apiService.getRequest('url test' , handleRes );
    function handleRes(data){
        console.log('handle');
        <Notification message={'some message'} alertModel={'primary'}></Notification>
    }

    const body = <Container>
        <Row>
            <>
                <label htmlFor='salary-question'>
                    حقوق مورد نظر شما:
                </label>
                <input
                    className='modal-input'
                    name='salary-question'
                    type='text' />
            </>
        </Row>

        <Row>
            <label htmlFor='years-question'>
                پیش‌بینی می‌کنید چه مدت کنار ما باشید؟
            </label>
            <input
                className='modal-input'
                name='years-question'
                type='text' />
        </Row>

        <Row>

            <>
                <label htmlFor='resume'>
                    رزومه
                </label>
                <input
                    className='modal-input'
                    name='resume'
                    type='file' />
            </>
        </Row>

        <Row>
            <>
                <label htmlFor='task-answer'>
                    پاسخ تسک
                </label>
                <input
                    className='modal-input'
                    name='task-answer'
                    type='file' />
            </>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
            <Button onClick={apiTest}>
                ارسال
            </Button>
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

export default ApplyModal;