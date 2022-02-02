import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import { useForm } from "react-hook-form";
import toastService from "../../Service/ToastService";

function EditApplyModal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const isApplicationEditable =
        props.applyState === 'not seen' || props.applyState === undefined
            ? true
            : false;

    const [unrequiredInfo, setUnrequiredAppInfo] = useState({
        salaryInterestValue: props.salaryInterest ? props.salaryInterest : 0,
        durationInterestValue: props.durationInterest ? props.durationInterest : 0,
    });

    let applicationInfo = {};

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const getResumeFileBase64 = async (resumeFile) => {
        try {
            const resumeFileBase64 = await getBase64(resumeFile);
            applicationInfo = {
                ...applicationInfo,
                resume: {
                    data: resumeFileBase64.substring(
                        resumeFileBase64.lastIndexOf(",") + 1),
                    mime: resumeFileBase64.substring(
                        resumeFileBase64.lastIndexOf(":") + 1,
                        resumeFileBase64.lastIndexOf(";")
                    )
                }
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    const getTaskAnswerFileBase64 = async (taskAnswerFile) => {
        try {
            const taskAnswerFileBase64 = await getBase64(taskAnswerFile);
            applicationInfo = {
                ...applicationInfo,
                task_solution: {
                    data: taskAnswerFileBase64.substring(
                        taskAnswerFileBase64.lastIndexOf(",") + 1),
                    mime: taskAnswerFileBase64.substring(
                        taskAnswerFileBase64.lastIndexOf(":") + 1,
                        taskAnswerFileBase64.lastIndexOf(";")
                    )
                }
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    const  onSubmitApplyForm = async (data) => {

        if (data.resumeFile['0']) {
            const resumeFile = data.resumeFile['0'];
            await getResumeFileBase64(resumeFile);
        }

        if (data.taskAnswerFile['0']) {
            const taskAnswerFile = data.taskAnswerFile['0'];
            await getTaskAnswerFileBase64(taskAnswerFile);
        }

        if (unrequiredInfo.salaryInterestValue) {
            applicationInfo = {
                ...applicationInfo,
                salary: unrequiredInfo.salaryInterestValue
            }
        }

        if (unrequiredInfo.durationInterestValue) {
            applicationInfo = {
                ...applicationInfo,
                contract_interest: unrequiredInfo.durationInterestValue
            }
        }

        props.editApplication(applicationInfo, props.applicationId)
    }

    const body =
        <form
            id="apply-form"
            onSubmit={handleSubmit(onSubmitApplyForm)}>
            <Container>
                <Row>
                    <>
                        <label htmlFor='salary-question'>
                            حقوق مورد نظر شما (تومان)
                        </label>
                        <input
                            className='modal-input'
                            name='salary-question'
                            type='number'
                            min={0}
                            style={{
                                padding: '0 !important',
                                margin: '0 !important'
                            }}
                            disabled={!isApplicationEditable}
                            value={unrequiredInfo.salaryInterestValue}
                            onChange={(e) => {
                                setUnrequiredAppInfo((prevState) => ({
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
                        min={0}
                        style={{
                            padding: '0 !important',
                            margin: '0 !important'
                        }}
                        disabled={!isApplicationEditable}
                        value={unrequiredInfo.durationInterestValue}
                        onChange={(e) => {
                            setUnrequiredAppInfo((prevState) => ({
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
                            <>
                                <input
                                    className='modal-input'
                                    name='resume'
                                    type='file'
                                    {...register(
                                        "resumeFile",
                                        {
                                            required: !props.resumeURL
                                        }
                                    )}
                                />
                                <div className="form-err">
                                    {errors.resumeFile?.type === 'required' && "الزامی"}
                                </div>
                            </>
                        }
                    </>
                </Row>

                <Row>
                    <>
                        <label htmlFor='taskAnswer'>
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
                            <>
                                <input
                                    className='modal-input'
                                    name='taskAnswer'
                                    type='file'
                                    {...register(
                                        "taskAnswerFile",
                                        {
                                            required: !props.taskAnswerURL
                                        }
                                    )}
                                />
                                <div className="form-err">
                                    {errors.taskAnswerFile?.type === 'required' && "الزامی"}
                                </div>
                            </>
                        }
                    </>
                </Row>
            </Container>
        </form>

    const footer = <>
        {
            isApplicationEditable &&
            <div
                className='col-auto'>
                <Button
                    type="submit"
                    form="apply-form"
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

export default EditApplyModal;