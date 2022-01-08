import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import { useParams } from "react-router-dom";


function ApplyModal(props) {
    const {
        btnLabel,
        btnHandler,
        show,
        onHide,
        applicationId,
        result_state,
        salary,
        contract_interest,
        resume,
        task_solution
    } = props;

    const editable =
        result_state === 'Unknown' || result_state === undefined
            ? true
            : false;

    const params = useParams();

    const [applyInfo, setApplyInfo] = useState({
        job_id: params.job_id,
        resume: resume,
        newResume: {
            byteCode: '',
            format: ''
        },
        task_solution: task_solution,
        new_task_solution: {
            byteCode: '',
            format: ''
        },
        salary: salary ? salary : 0,
        contract_interest: contract_interest ? contract_interest : 0,
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
                    disabled={!editable}
                    value={applyInfo.salary}
                    onChange={(e) => {
                        setApplyInfo((prevState) => ({
                            ...prevState,
                            salary: e.target.value
                        }))
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
                disabled={!editable}
                value={applyInfo.contract_interest}
                onChange={(e) => {
                    setApplyInfo((prevState) => ({
                        ...prevState,
                        contract_interest: e.target.value
                    }))
                }}
            />
        </Row>

        <Row>
            <>
                <label htmlFor='resume'>
                    رزومه
                </label>

                {
                    applyInfo.resume.length > 0 &&
                    <a href={applyInfo.resume}>
                        دانلود
                    </a>
                }

                {
                    editable &&
                    <input
                        required={applyInfo.resume.length === 0}
                        className='modal-input'
                        name='resume'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let resumeData = new FormData();
                            resumeData.append(file.name, file);
                            setApplyInfo((prevState) => ({
                                ...prevState,
                                newResume: {
                                    byteCode: resumeData,
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
                    applyInfo.task_solution.length > 0 &&
                    <a href={applyInfo.task_solution}>
                        دانلود
                    </a>
                }

                {
                    editable &&
                    <input
                        required={applyInfo.task_solution.length === 0}
                        className='modal-input'
                        name='task_solution'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let taskSolutionData = new FormData();
                            taskSolutionData.append(file.name, file);
                            setApplyInfo((prevState) => ({
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
            editable &&
            <div
                className='col-auto'>
                <Button
                    onClick={() => {
                        applicationId
                            ? btnHandler(applyInfo, applicationId)
                            : btnHandler(applyInfo)
                    }}
                    variant="warning">
                    {btnLabel}
                </Button>
            </div>
        }
    </>;

    return (
        <ModalComponent
            size="sm"
            body={body}
            footer={footer}
            show={show}
            onHide={onHide} />
    );
}

export default ApplyModal;