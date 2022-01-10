import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import { useParams } from "react-router-dom";

function ApplyModal(props) {
    const URLParams = useParams();

    const isApplicationEditable =
        props.applyState === 'Unknown' || props.applyState === undefined
            ? true
            : false;

    const [applicationInfo, setApplicationInfo] = useState({
        salaryInterestValue: props.salaryInterest ? props.salaryInterest : 0,
        durationInterestValue: props.durationInterest ? props.durationInterest : 0,
        resumeFile: {
            byteCode: '',
            format: ''
        },
        taskAnswerFile: {
            byteCode: '',
            format: ''
        }
    })

    const body = <Container>
        <Row>
            <>
                <label htmlFor='salary-question'>
                    حقوق مورد نظر شما (تومان)
                </label>
                <input
                    className='modal-input'
                    name='salary-question'
                    type='number'
                    style={{
                        padding: '0 !important',
                        margin: '0 !important'
                    }}
                    disabled={!isApplicationEditable}
                    value={applicationInfo.salaryInterestValue}
                    onChange={(e) => {
                        setApplicationInfo((prevState) => ({
                            ...prevState,
                            salaryInterestValue: e.target.value
                        }));
                    }}
                />
            </>
        </Row>

        <Row>
            <label htmlFor='years-question'>
                پیش‌بینی می‌کنید چه مدت در کنار ما باشید؟ (ماه)
            </label>
            <input
                className='modal-input'
                name='years-question'
                type='number'
                style={{
                    padding: '0 !important',
                    margin: '0 !important'
                }}
                disabled={!isApplicationEditable}
                value={applicationInfo.durationInterestValue}
                onChange={(e) => {
                    setApplicationInfo((prevState) => ({
                        ...prevState,
                        durationInterestValue: e.target.value
                    }));
                }}
            />
        </Row>

        <Row>
            <>
                <label htmlFor='resume'>
                    رزومه
                </label>

                {
                    props.resumeURL &&
                    props.resumeURL.length > 0 &&
                    <a href={props.resumeURL}>
                        دانلود
                    </a>
                }

                {
                    isApplicationEditable &&
                    <input
                        required={!props.resumeURL}
                        className='modal-input'
                        name='resume'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let resumeFileData = new FormData();
                            resumeFileData.append(file.name, file);
                            setApplicationInfo((prevState) => ({
                                ...prevState,
                                resumeFile: {
                                    byteCode: resumeFileData,
                                    format: file.type
                                }
                            }));
                        }}
                    />
                }
            </>
        </Row>

        <Row>
            <>
                <label htmlFor='task-answer'>
                    پاسخ تسک
                </label>

                {
                    props.taskAnswerURL &&
                    props.taskAnswerURL.length > 0 &&
                    <a href={props.taskAnswerURL}>
                        دانلود
                    </a>
                }

                {
                    isApplicationEditable &&
                    <input
                        required={!props.taskAnswerURL}
                        className='modal-input'
                        name='task_solution'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let taskSolutionData = new FormData();
                            taskSolutionData.append(file.name, file);
                            setApplicationInfo((prevState) => ({
                                ...prevState,
                                new_task_solution: {
                                    byteCode: taskSolutionData,
                                    format: file.type
                                }
                            }));
                        }}
                    />
                }
            </>
        </Row>
    </Container>;

    const footer = <>
        {
            isApplicationEditable &&
            <div
                className='col-auto'>
                <Button
                    onClick={() => {
                        props.applicationId
                            ? props.editApplication(applicationInfo, props.applicationId)
                            : props.applyForJob(applicationInfo, URLParams.jobId)
                    }}
                    variant="warning">
                    {props.btnLabel}
                </Button>
            </div>
        }
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