import '../../styles/EditJobModalContainer.css';
import EditJobModal from './EditJobModal';
import { useState } from 'react';

function EditJobModalContainer(props) {
    const [editJobModalShow, setEditJobModalShow] = useState(false);

    return (
        <div className='edit-job-modal'>

            <i
                className="fa fa-edit fa-lg"
                onClick={() => setEditJobModalShow(true)}>
            </i>

            <EditJobModal
                show={editJobModalShow}
                onHide={() => setEditJobModalShow(false)} 
                showEditButtons={true}
                {...props}
            />


        </div >
    );
}

export default EditJobModalContainer;
