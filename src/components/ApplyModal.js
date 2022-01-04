import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import apiService from "../Service/APIService";
import Notification from "./Core/Notification";
import applicationService from "../Service/ApplicationService";
import { useState } from "react";

import toastService from "../Service/ToastService";
import jobsService from "../Service/JobsService";
 

function ApplyModal(props) {


    const apiTest = apiService.getRequest('url test', handleRes);
    function handleRes(data) {
        console.log('handle');
        <Notification message={'some message'} alertModel={'primary'}></Notification>
    }

    const [applyObject, setApplyObj] = useState({
        resume : '',
        task_solution : '',
        salary : 0,
        contract_interest : 0,
        jobId : 0   //get from jobService
    })

    async function sendApply() {
        try {
            const res = await applicationService.setUserApply(applyObject);
        } catch (error) {
            toastService.showToast(error , 'danger');
        }
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
                    type='text' 
                    value={applyObject.salary}/>
            </>
        </Row>

        <Row>
            <label htmlFor='years-question'>
                پیش‌بینی می‌کنید چه مدت کنار ما باشید؟
            </label>
            <input
                className='modal-input'
                name='years-question'
                type='text' 
                value={applyObject.contract_interest}/>
        </Row>

        <Row>

            <>
                <label htmlFor='resume'>
                    رزومه
                </label>
                <input
                    className='modal-input'
                    name='resume'
                    type='file' 
                    value={applyObject.resume}/>
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
                    type='file' 
                    value={applyObject.task_solution}/>
            </>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
            <Button onClick={sendApply}>
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