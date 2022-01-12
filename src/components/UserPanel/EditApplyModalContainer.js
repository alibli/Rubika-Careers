import ApplyModal from '../ApplyModal';
import { useState } from 'react';
import applicationService from '../../Service/ApplicationService';
import toastService from '../../Service/ToastService';
import '../../styles/EditApplyModalContainer.css'

function EditApplyModalContainer(props) {

    const [editApplyModalShow, setEditApplyModalShow] = useState(false);

    async function editApplication(editedApplyInfo, applicationId) {
        try {
            const editApplyRes = applicationService.editJobApplication(editedApplyInfo, applicationId);
            if (editApplyRes.status === 202) {
                window.location.reload();
                toastService.showToast('درخواست شما با موفقیت به روزرسانی شد', 'success');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('امکان به روز رسانی درخواست وجود ندارد.', 'danger');
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

            <ApplyModal
                show={editApplyModalShow}
                onHide={() => setEditApplyModalShow(false)}
                btnLabel="ویرایش"
                jobApplicationEdit={(editedInfo, id) => editApplication(editedInfo, id)}
                {...props} />
        </div >
    );
}

export default EditApplyModalContainer;
