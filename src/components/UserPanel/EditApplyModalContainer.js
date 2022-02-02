import { useState } from 'react';
import applicationService from '../../Service/ApplicationService';
import toastService from '../../Service/ToastService';
import '../../styles/EditApplyModalContainer.css'
import EditApplyModal from './EditApplyModal';
// import ApplyModal from '../ApplyModal';

function EditApplyModalContainer(props) {

    const [editApplyModalShow, setEditApplyModalShow] = useState(false);


    async function editApplication(editedApplyInfo, applicationId) {
        try {
            const editApplyRes = await applicationService.editJobApplication(editedApplyInfo, applicationId);
            if (editApplyRes.status === 200) {
                toastService.showToast('درخواست شما با موفقیت به روزرسانی شد.', 'success');
                setTimeout(() => {
                window.location.reload();
                }, 3000);
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('امکان به روز رسانی درخواست وجود ندارد.', 'danger');
                } else {
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

    return (

        <div className='edit-apply-modal'>
            <i
                className="fa fa-eye fa-lg"
                onClick={() => setEditApplyModalShow(true)}>
            </i>

            <EditApplyModal
                show={editApplyModalShow}
                onHide={() => setEditApplyModalShow(false)}
                btnLabel="ویرایش"
                editApplication={(editedInfo, id) => editApplication(editedInfo, id)} 
                {...props} />
        </div >
    );
}

export default EditApplyModalContainer;
