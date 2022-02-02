import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/EditJobModal.css';
import { useState, useEffect } from 'react';
import toastService from "../../Service/ToastService";
import jobsService from "../../Service/JobsService";
import { EditorState, ContentState, convertFromRaw } from 'draft-js';

let editedFields = [];

function EditJobModal(props) {
    const [deactiveJob, setDeactiveJob] = useState(props.isJobDeactive);

    const [jobDetails, setJobDetails] = useState({
        jobTitle: '',
        jobDescription: EditorState.createEmpty(),
        jobTaskLink: ''
    });

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const getTaskFileBase64 = async (taskFile) => {
        try {
            const taskFileBase64 = await getBase64(taskFile);
            return taskFileBase64;
        } catch (err) {
            console.log(err);
        }
    }

    const setJobTaskFile = (async (e) => {
        let taskFile = e.target.files[0];
        const taskFileBase64 = await getTaskFileBase64(taskFile);
        setJobDetails((prevState) => ({
            ...prevState,
            jobTaskFile: {
                bytecode: taskFileBase64.substring(taskFileBase64.lastIndexOf(",") + 1),
                format: taskFileBase64.substring(
                    taskFileBase64.lastIndexOf(":") + 1,
                    taskFileBase64.lastIndexOf(";")
                )
            }
        }));
        if (editedFields.indexOf('jobTaskFile') === -1) {
            editedFields.push('jobTaskFile');
        }
    });

    async function getJobDetails(id) {
        try {
            const jobDetailsResponse = await jobsService.getJobDetails(id);
            const { data } = jobDetailsResponse;
            setJobDetails((prevState) => ({
                ...prevState,
                jobTitle: data.title,
                jobDescription: EditorState.createWithContent(ContentState.createFromText(`${data.description}`)),
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
        if(editedFields.length === 0) {
            alert('موردی برای ذخیره وجود ندارد.')
            return;
        } else {
            var editedJobInfo = {}
            editedFields.forEach(field => {
                switch (field) {
                    case 'deactiveJob':
                        editedJobInfo['is_deactive'] = deactiveJob;
                        break;
                    case 'jobTitle':
                        editedJobInfo['title'] = jobDetails.jobTitle;
                        break;
                    case 'jobDescription':
                        const content = jobDetails.jobDescription.getCurrentContent();
                        const descript = content.getPlainText();
                        editedJobInfo['description'] = descript;
                        break;
                    case 'jobTaskFile':
                        editedJobInfo['task'] = {
                            mime: jobDetails.jobTaskFile.format,
                            data: jobDetails.jobTaskFile.bytecode
                        }
                        break;
                    case 'deletedJob':
                        editedJobInfo['is_deleted'] = true;
                    default:
                        break;
                }
            })
            console.log(editedJobInfo);
    
            try {
                const editJobRes = await jobsService.editJobPosition(jobId, editedJobInfo);
                if (editJobRes.status === 200) {
                    toastService.showToast('تغییرات مورد نظر اعمال شد.', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            } catch (err) {
                editedFields.splice(editedFields.indexOf('deletedJob'))
                if (err.response) {
                    if (err.response.status === 400) {
                        toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                    } else if (err.response.status === 403) {
                        toastService.showToast('شما این موقعبت شغلی را ایجاد نکردید.', 'danger');
                    } else {
                        toastService.showToast(err.response.statusText, 'danger');
                    }
                } else {
                    toastService.showToast(err.message, 'danger');
                }
            }
        }
        
    }

    function deleteJobPosition() {
        const confirmJobDelete = window.confirm('موقعیت شغلی مورد نظر حذف شود؟');
        if (confirmJobDelete) {
            if (editedFields.indexOf('deletedJob') === -1) {
                editedFields.push('deletedJob');
            }
            editJobPosition(props.jobId);
        }
    }

    const onEditorStateChange = (editorState) => {

        setJobDetails((prevState) => ({
            ...prevState,
            jobDescription: editorState,
        }));
        if (editedFields.indexOf('jobDescription') === -1) {
            editedFields.push('jobDescription');
        }
    };

    const body =
        <form id="job-form">
            <Container>
                <Row>
                    <Button
                        variant="info"
                        onClick={() => {
                            setDeactiveJob(!deactiveJob);
                            if (editedFields.indexOf('deactiveJob') === -1) {
                                editedFields.push('deactiveJob');
                            }
                        }}
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
                            if (editedFields.indexOf('jobTitle') === -1) {
                                editedFields.push('jobTitle');
                            }
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
                        wrapperClassName="job-position-editor-wrapper"
                        editorClassName="job-position-editor"
                        editorState={jobDetails.jobDescription}
                        onEditorStateChange={onEditorStateChange}
                    />

                </div>

                <Row>
                    <>
                        <label htmlFor='resume'>
                            تسک
                        </label>
                        {
                            jobDetails.jobTaskLink &&
                            <a href={jobDetails.jobTaskLink}>
                                دانلود
                            </a>
                        }

                        <input
                            className='modal-input'
                            name='resume'
                            type='file'
                            onChange={(e) => setJobTaskFile(e)}
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
                form="job-form"
                className="edit-modal-btn"
                onClick={() => editJobPosition(props.jobId)}>
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