import '../../styles/EditJobModalContainer.css';
import EditJobModal from './EditJobModal';
import { useState } from 'react';

function AddJobModalContainer() {
    const [editJobModalShow, setEditJobModalShow] = useState(false);

    return (
        <div className='add-job-modal'>

            <button className='btn btn-danger'
                onClick={() => setEditJobModalShow(true)}>
                ایجاد موقعیت
            </button>

            <EditJobModal
                buttons={[
                    {
                        label: 'ذخیره',
                        style: {
                            marginLeft: '0.5em'
                        }
                    },
                    {
                        label: 'غیرفعال',
                        style: {
                            marginLeft: '0.5em'
                        }
                    },
                    {
                        label: 'حذف',
                        style: {
                            marginLeft: '0.5em'
                        }
                    }

                ]}
                show={editJobModalShow}
                onHide={() => setEditJobModalShow(false)} />


        </div >
    );
}

export default AddJobModalContainer;
