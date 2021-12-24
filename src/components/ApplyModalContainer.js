import ApplyModal from './ApplyModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/ApplyModalContainer.css'

function ApplyModalContainer() {
    const [applyModalShow, setApplyModalShow] = useState(false);

    return (
        <div className='apply-modal'>
            <Button 
            className='apply-btn'
            variant='danger'
            onClick={() => setApplyModalShow(true)}>
                درخواست
            </Button>

            <ApplyModal
                show={applyModalShow}
                onHide={() => setApplyModalShow(false)} />
        </div >
    );
}

export default ApplyModalContainer;
