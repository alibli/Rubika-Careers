import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/EditJobModal.css';
import { useState, useEffect } from 'react';
import toastService from "../../Service/ToastService";
import jobsService from "../../Service/JobsService";

function EditJobModal(props) {
    const [deactiveJob, setDeactiveJob] = useState(props.isJobDeactive);

    let deletedJob = false;

    const [jobDetails, setJobDetails] = useState({
        jobTitle: '',
        jobDescription: '',
        jobTaskLink: '',
        jobTaskFile: {
            bytecode: '',
            format: ''
        }
    });

    async function getJobDetails(id) {
        try {
            const jobDetailsResponse = await jobsService.getJobDetails(id);
            const { data } = jobDetailsResponse;
            setJobDetails((prevState) => ({
                ...prevState,
                jobTitle: data.title,
                jobDescription: data.description,
                jobTaskLink: data.task
            }));
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        getJobDetails(props.jobId);
    }, [props.jobId]);

    async function editJobPosition(jobId) {
        try {
            const editJobReqBody = {
                jobTitle: jobDetails.jobTitle,
                jobDescription: jobDetails.jobDescription,
                jobTaskFile: jobDetails.jobTaskFile,
                deactiveJob: deactiveJob,
                deletedJob: deletedJob
            }

            const editJobRes = await jobsService.addJobPosition(jobId, editJobReqBody);
            if (editJobRes.status === 200) { //need this?
                window.location.reload();
                toastService.showToast('موقعیت شغلی مورد نظر ویرایش شد', 'success');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                } else if (err.response.status === 403) {
                    toastService.showToast('شما این موقعبت شغلی را ایجاد نکردید.', 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

    function deleteJobPosition() {
        const confirmJobDelete = window.confirm('موقعیت شغلی مورد نظر حذف شود؟');
        if (confirmJobDelete) {
            deletedJob = true;
        }
    }

    const body =
        <form id="job-form">
            <Container>
                <Row>
                    <Button
                        variant="info"
                        onClick={() => setDeactiveJob(!deactiveJob)}
                        style={{
                            margin: 'auto',
                            width: '10em'
                        }}>
                        {
                            deactiveJob
                                ? 'غیر فعال'
                                : ' فعال'
                        }
                    </Button>
                </Row>
                <Row>
                    <label htmlFor='edit-job-title'>
                        عنوان
                    </label>
                    <input
                        required
                        className='modal-input'
                        name='edit-job-title'
                        type='text'
                        value={jobDetails.jobTitle}
                        onChange={(e) => {
                            setJobDetails((prevState) => ({
                                ...prevState,
                                jobTitle: e.target.value
                            }));
                        }}
                    />
                </Row>

                <Row>
                    <label htmlFor='edit-job-descrip'>
                        شرح
                    </label>
                </Row>

                <div style={{
                    direction: 'ltr',
                    textDecoration: 'none'
                }}>
                    <Editor
                        editorState={jobDetails.jobDescription}
                        wrapperClassName="job-position-editor-wrapper"
                        editorClassName="job-position-editor"
                        onEditorStateChange={(e) => {
                            setJobDetails((prevState) => ({
                                ...prevState,
                                jobDescription: e.target.value
                            }));
                        }}
                    />
                </div>

                <Row>
                    <>
                        <label htmlFor='resume'>
                            تسک
                        </label>

                        <a href={jobDetails.jobTaskLink}>
                            دانلود
                        </a>

                        <input
                            required={!jobDetails.jobTaskLink.length}
                            className='modal-input'
                            name='resume'
                            type='file'
                            onChange={(e) => {
                                let file = e.target.files[0];
                                let taskFileData = new FormData();
                                taskFileData.append(file.name, file);
                                setJobDetails((prevState) => ({
                                    ...prevState,
                                    jobTaskFile: {
                                        bytecode: taskFileData,
                                        format: file.type
                                    }
                                }));
                            }}
                        />
                    </>
                </Row>
            </Container>
        </form>;

    const footer = <>
        <div className='col-auto'>
            <Button
                variant="danger"
                className="edit-modal-btn"
                onClick={() => deleteJobPosition()}>
                حذف
            </Button>
            <Button
                variant="warning"
                type="submit"
                form="job-form"
                className="edit-modal-btn"
                onSubmit={() => editJobPosition(props.jobId)}>
                ذخیره
            </Button>
        </div>
    </>;

    return (
        <ModalComponent
            size='lg'
            body={body}
            footer={footer}
            show={props.show}
            onHide={props.onHide} />
    );
}

export default EditJobModal;