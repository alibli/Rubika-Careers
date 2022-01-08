import ApplyModal from './ApplyModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/ApplyModalContainer.css';
import applicationService from "../Service/ApplicationService";
import toastService from "../Service/ToastService";

function ApplyModalContainer() {
    const [applyModalShow, setApplyModalShow] = useState(false);

    async function apply(applyInfo) {
        const response = applicationService.applyForJob(applyInfo);
        response
            .then(({ status }) => {
                if (status === 200) {
                    toastService.showToast('درخواست شما با موفقیت ارسال شد', 'success');
                    setApplyModalShow(false);
                }
            }).catch((err) => {
                if (err.response) {
                    if (err.response.status === 400) {
                        toastService.showToast('اطلاعات وارد شده صحیح نیست.', 'danger');
                    }
                } else {
                    toastService.showToast(err.message, 'danger');
                }
            });
    }

    return (
        <div className='apply-modal'>

            <Button
                id="apply"
                className='apply-btn'
                variant='danger'
                onClick={() => setApplyModalShow(true)}>
                درخواست
            </Button>

            <ApplyModal
                show={applyModalShow}
                btnLabel="ارسال"
                btnHandler={apply}
                onHide={() => setApplyModalShow(false)} />
        </div >
    );
}

export default ApplyModalContainer;
