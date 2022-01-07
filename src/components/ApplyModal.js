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
        resume: resume ? resume : '',
        task_solution: task_solution ? task_solution : '',
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
                <input
                    required
                    className='modal-input'
                    name='resume'
                    type='file'
                    accept=".pdf"
                    disabled={!editable}
                    value={applyInfo.resume}
                    onChange={(e) => {
                        let file = e.target.files[0];
                        let resumeData = new FormData();
                        resumeData.append(file.name, file);
                        setApplyInfo((prevState) => ({
                            ...prevState,
                            resume: resumeData
                        }));
                    }}
                />
            </>
        </Row>

        <Row>
            <>
                <label htmlFor='task-answer'>
                    پاسخ تسک
                </label>
                <input
                    required
                    className='modal-input'
                    name='task_solution'
                    type='file'
                    accept=".pdf"
                    disabled={!editable}
                    value={applyInfo.task_solution}
                    onChange={(e) => {
                        let file = e.target.files[0];
                        let taskSolutionData = new FormData();
                        taskSolutionData.append(file.name, file);
                        setApplyInfo((prevState) => ({
                            ...prevState,
                            task_solution: taskSolutionData
                        }));
                    }}
                />
            </>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
            <Button
                onClick={() => btnHandler(applyInfo)}
                variant="warning">
                {btnLabel}
            </Button>
        </div>
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