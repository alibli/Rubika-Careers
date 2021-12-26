import '../../styles/EditJobModalContainer.css';
import EditJobModal from './EditJobModal';
import { useState } from 'react';

function EditJobModalContainer() {
    const [editJobModalShow, setEditJobModalShow] = useState(false);

    return (
        <div className='edit-job-modal'>

            <button className='button'
                onClick={() => setEditJobModalShow(true)}>
                Edit
            </button>

            <EditJobModal
                buttons={[
                    {
                        label: 'ذخیره'
                    }
                ]}
                show={editJobModalShow}
                onHide={() => setEditJobModalShow(false)} />


        </div >
    );
}

export default EditJobModalContainer;
