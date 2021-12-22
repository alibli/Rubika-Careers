import ApplyModal from './ApplyModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function ApplyModalContainer() {
    const [applyModalShow, setApplyModalShow] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setApplyModalShow(true)}>
                درخواست
            </Button>

            <ApplyModal
                show={applyModalShow}
                onHide={() => setApplyModalShow(false)} />
        </div >
    );
}

export default ApplyModalContainer;
