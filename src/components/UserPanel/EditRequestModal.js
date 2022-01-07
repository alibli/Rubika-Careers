import ApplyModal from '../ApplyModal';
import { useState } from 'react';

function EditRequestModal({salary, contract_interest, resume, task_solution}) {
    const [editRequestShow, setEditRequestShow] = useState(false);

    return (
        <div className='edit-request-modal'>
            <i
                className="fa fa-eye"
                onClick={() => setEditRequestShow(true)}>
            </i>

            <ApplyModal
                show={editRequestShow}
                salary={salary}
                contractInterest={contract_interest}
                resume={resume}
                taskSolution={task_solution}
                onHide={() => setEditRequestShow(false)} />
        </div >
    );
}

export default EditRequestModal;
