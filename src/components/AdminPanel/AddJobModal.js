import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/EditJobModal.css';
import { useState } from 'react';
import toastService from "../../Service/ToastService";
import jobsService from "../../Service/JobsService";
import { EditorState, convertToRaw } from 'draft-js';

function AddJobModal(props) {
    const [deactiveJob, setDeactiveJob] = useState(false);

    const [jobDetails, setJobDetails] = useState({
        jobTitle: '',
        jobDescription: '',
        jobTaskFile: {
            bytecode: '',
            format: ''
        }
    }
    );

    const [editorState, handleEditorState] = useState('');

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
            toastService.showToast(err.message, 'danger');
        }
    }

    const setJobTaskFile = (async (e) => {
        let taskFile = e.target.files[0];
        const taskFileBase64 = await getTaskFileBase64(taskFile);
        setJobDetails(prevState => ({
            ...prevState,
            jobTaskFile: {
                bytecode: taskFileBase64.substring(taskFileBase64.lastIndexOf(",") + 1),
                format: taskFileBase64.substring(
                    taskFileBase64.lastIndexOf(":") + 1,
                    taskFileBase64.lastIndexOf(";")
                )
            }
        }));
    });

    async function addJobPosition() {
        try {
            const addJobReqBody = {
                jobTitle: jobDetails.jobTitle,
                jobDescription: jobDetails.jobDescription,
                jobTaskFile: jobDetails.jobTaskFile,
                deactiveJob: deactiveJob,
                
            }

            const editJobRes = await jobsService.addJobPosition(addJobReqBody);
            if (editJobRes.status === 201) {
                window.location.reload();
                toastService.showToast('موقعیت شغلی مورد نظر اضافه شد.', 'success');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('عدم موفقیت در افزودن موقعیت شغلی جدید', 'danger');
                } else {
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }


    const onEditorStateChange = (editorState) => {
        let txt = '';
        editorState.blocks.forEach((block) => {
            txt = txt + '\n' + JSON.stringify(block.text);
        })
        setJobDetails((prevState) => ({
            ...prevState,
            jobDescription: txt
        }));
    };


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
                wrapperClassName="job-position-editor-wrapper"
                editorClassName="job-position-editor"
                onContentStateChange={onEditorStateChange}
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
                    onChange={(e) => setJobTaskFile(e)}
                />
            </>
        </Row>
    </Container>;

    const footer = <>
        <div className='col-auto'>
            <Button
                variant="warning"
                className="edit-modal-btn"
                onClick={() => addJobPosition()}>
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