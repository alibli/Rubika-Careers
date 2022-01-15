import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/EditJobModal.css';
import { useState } from 'react';
import toastService from "../../Service/ToastService";
import jobsService from "../../Service/JobsService";

function AddJobModal(props) {
    const [deactiveJob, setDeactiveJob] = useState(false);

    const [jobDetails, setJobDetails] = useState({
        jobTitle: '',
        jobDescription: '',
        jobTaskFile: {
            bytecode: '',
            format: ''
        }
    });

    async function addJobPosition(jobId) {
        try {
            const addJobReqBody = {
                jobTitle: jobDetails.jobTitle,
                jobDescription: jobDetails.jobDescription,
                jobTaskFile: jobDetails.jobTaskFile,
                deactiveJob: deactiveJob,
            }

            const editJobRes = await jobsService.addJobPosition(addJobReqBody);
            if (editJobRes.status === 201) { //need this?
                window.location.reload();
                toastService.showToast('موقعیت شغلی مورد نظر اضافه شد.', 'success');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('عدم موفقیت در افزودن موقعیت شغلی جدید', 'danger');
                } 
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }


    const body = <Container>
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

                <input
                    required
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
    </Container>;

    const footer = <>
        <div className='col-auto'>
            <Button
                variant="warning"
                className="edit-modal-btn"
                onClick={() => addJobPosition(props.jobId)}>
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

export default AddJobModal;