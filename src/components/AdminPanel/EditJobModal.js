import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/EditJobModal.css';

function EditJobModal(props) {

    const body = <Container>
        <Row>
            <label htmlFor='edit-job-title'>
                عنوان
            </label>
            <input
                className='modal-input'
                name='edit-job-title'
                type='text' />
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
            />
        </div>

        <Row>
            <div style={{
                display: 'flex',
                justifyCongtent: 'space-between',
                width: '70%'
            }}>
                <label 
                htmlFor='edit-job-task'
                style={{
                        margin: '0.5em'
                }}>
                    فایل تسک
                </label>
                <input
                    className='modal-input'
                    name='edit-job-task'
                    type='file' />
            </div>
        </Row>
    </Container>;

    const footer = <>
        <div
            className='col-auto'>
                {
                    props.buttons.map((button, index) => (
                        <Button 
                        key={index}
                        style={button.style}>
                            {button.label}
                        </Button>
                    ))
                }
        </div>
    </>;

    return (
        <ModalComponent
            size={'lg'}
            body={body}
            footer={footer}
            show={props.show}
            onHide={props.onHide} />
    );
}

export default EditJobModal;