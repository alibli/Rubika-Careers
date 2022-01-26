import ApplyModal from './ApplyModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/ApplyModalContainer.css';
import applicationService from "../Service/ApplicationService";
import toastService from "../Service/ToastService";

function ApplyModalContainer() {
    const [applyModalShow, setApplyModalShow] = useState(false);

    async function applyForJob(applyInfo, jobId) {
        try {
            const applyRes = await applicationService.applyForJob(applyInfo, jobId);
            if (applyRes.status === 200) {
                toastService.showToast('درخواست شما با موفقیت ارسال شد', 'success');
                setApplyModalShow(false);
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                } else {
                    console.log(err.response)
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

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
                onHide={() => setApplyModalShow(false)}
                btnLabel="ارسال"
                applyForJob={(info, id) => applyForJob(info, id)} />
        </div >
    );
}

export default ApplyModalContainer;
