import ApplyModal from '../ApplyModal';
import { useState } from 'react';
import applicationService from '../../Service/ApplicationService';
import toastService from '../../Service/ToastService';

function EditApplyModal(props) {
    const {
        applicationId,
        result_state,
        salary,
        contract_interest,
        resume,
        task_solution
    } = props;

    const [editApplyShow, setEditApplyShow] = useState(false);

    async function editApply(applyInfo, applicationId) {
        const response = applicationService.editApply(applyInfo, applicationId);
        response
            .then((res) => {
                if (res.status === 202) {
                    window.location.reload();
                    toastService.showToast('درخواست شما با موفقیت به روزرسانی شد', 'success');
                }
            }).catch((err) => {
                if (err.response) {
                    if (err.response.status === 403) {
                        toastService.showToast('امکان به روز رسانی درخواست وجود ندارد.', 'danger');
                    }
                } else {
                    toastService.showToast(err.message, 'danger');
                }
            });
    }

    return (
        <div className='edit-apply-modal'>

            <i
                className="fa fa-eye"
                onClick={() => setEditApplyShow(true)}>
            </i>

            <ApplyModal
                show={editApplyShow}
                onHide={() => setEditApplyShow(false)}
                btnLabel="ویرایش"
                btnHandler={editApply}
                applicationId={applicationId}
                salary={salary}
                contract_interest={contract_interest}
                resume={resume}
                task_solution={task_solution}
                result_state={result_state} />
        </div >
    );
}

export default EditApplyModal;
