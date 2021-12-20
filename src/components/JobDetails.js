import LoginModal from './LoginModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function JobDetails() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <p>Job Title</p>
            <p>Job Description</p>
            <p>Task</p>

            <Button variant="primary" onClick={() => {
                setModalShow(true)
                console.log(modalShow)
            }}>
                Apply
            </Button>

            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </div >
    );
}

export default JobDetails;