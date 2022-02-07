import ModalComponent from "./Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toastService from "../Service/ToastService";
import userService from '../Service/UserService';
import { useEffect } from 'react';
import { baseURL } from "../Service/APIService";

function ApplyModal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const userFirstname = userService.getUserFirstname();
    const [firstname, setUerFirstname] = useState(userFirstname);

    const URLParams = useParams();

    const [unrequiredInfo, setUnrequiredAppInfo] = useState({
        salaryInterestValue: 0,
        durationInterestValue: 0,
    });

    const [resumeLink, setResumeLink] = useState();

    let applicationInfo = {};

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
                const newFirstname = userService.getUserFirstname();
                setUerFirstname(newFirstname);
                break;

            case 'USER-LOGOUT':
                setUerFirstname('');
                break;

            case 'STORAGE-CHANGE':
                const newFirstnameVal = userService.getUserFirstname();
                setUerFirstname(newFirstnameVal);
                break;

            default:
                break;
        }
    };

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
                resumeFile: {
                    bytecode: resumeFileBase64.substring(
                        resumeFileBase64.lastIndexOf(",") + 1),
                    format: resumeFileBase64.substring(
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
                taskAnswerFile: {
                    bytecode: taskAnswerFileBase64.substring(
                        taskAnswerFileBase64.lastIndexOf(",") + 1),
                    format: taskAnswerFileBase64.substring(
                        taskAnswerFileBase64.lastIndexOf(":") + 1,
                        taskAnswerFileBase64.lastIndexOf(";")
                    )
                }
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    const onSubmitApplyForm = async (data) => {

        const resumeFile = data.resumeFile['0'];
        await getResumeFileBase64(resumeFile);

        const taskAnswerFile = data.taskAnswerFile['0'];
        await getTaskAnswerFileBase64(taskAnswerFile);

        applicationInfo = {
            ...applicationInfo,
            salaryInterestValue: unrequiredInfo.salaryInterestValue ? unrequiredInfo.salaryInterestValue : '0',
            durationInterestValue: unrequiredInfo.durationInterestValue ? unrequiredInfo.durationInterestValue : '0',
        }

        props.applyForJob(applicationInfo, URLParams.jobId)
    }

    async function getuserResume() {
        try {
            const userResumeRes = await userService.getUserProfile();
            setResumeLink(userResumeRes.data.resume);
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return () => {
            userService.userSubject.unsubscribe(userObserver);
        };
    }, []);

    useEffect(() => {
        if (firstname !== 'ادمین') {
            getuserResume();
        }
    }, [firstname]);

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
                           resumeLink &&
                            <a href={baseURL + resumeLink}>
                                دانلود
                            </a>
                        }

                        <input
                            className='modal-input'
                            name='resume'
                            type='file'
                            {...register(
                                "resumeFile",
                                {
                                    required: true
                                }
                            )}
                        />
                        <div className="form-err">
                            {errors.resumeFile?.type === 'required' && "الزامی"}
                        </div>

                    </>
                </Row>

                <Row>
                    <>
                        <label htmlFor='taskAnswer'>
                            پاسخ تسک
                        </label>


                        <input
                            className='modal-input'
                            name='taskAnswer'
                            type='file'
                            {...register(
                                "taskAnswerFile",
                                {
                                    required: true
                                }
                            )}
                        />
                        <div className="form-err">
                            {errors.taskAnswerFile?.type === 'required' && "الزامی"}
                        </div>

                    </>
                </Row>
            </Container>
        </form>

    const footer = <>

        <div
            className='col-auto'>
            <Button
                type="submit"
                form="apply-form"
                variant="warning">
                {props.btnLabel}
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