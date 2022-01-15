// import '../../styles/EditJobModalContainer.css';
import '../../styles/AddJobModalContainer.css';
import AddJobModal from './AddJobModal';
import { useState } from 'react';

function AddJobModalContainer() {
    const [addJobModalShow, setaddJobModalShow] = useState(false);

    return (
        <div className='add-job-modal'>

            <button
                className='btn btn-danger'
                id='add-job-btn'
                onClick={() => setaddJobModalShow(true)}>
                    افزودن موقعیت شغلی
            </button>

            <AddJobModal
                show={addJobModalShow}
                onHide={() => setaddJobModalShow(false)} />

        </div >
    );
}

export default AddJobModalContainer;
