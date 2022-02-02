import { useState } from 'react';
import jobsService from '../../Service/JobsService';
import toastService from '../../Service/ToastService';
import '../../styles/ReqStatusDropdown.css';
let currentStatus = '';
function ReqStatusDropdown(props) {
    const [newStatus, setNewStatus] = useState(props.reqStatus);
    // const [newStatus, setNewStatus] = useState("not seen");

    const disableStatusChangeValue = 
        props.reqStatus === 'not seen' || props.reqStatus === 'in progress'
        ? false
        : true;
    
    const [disableStatusChange, setDisableStatusChange] = useState(disableStatusChangeValue);

    async function setApplicationStatus(currentStatus) {
        try {
            let newStatus2 = currentStatus;
            const changeStatusRes = await jobsService.setApplicationStatus(props.jobId, props.reqId, newStatus2);
            const response  = changeStatusRes;
            if (response.status === 200) {
                if (newStatus === 'reject' || newStatus === 'accept') {
                    setDisableStatusChange(true);
                }
                toastService.showToast('وضعیت درخواست با موفقیت تغییر کرد.', 'success');
            }
        } catch (err) {
            if(err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('شما اجازه ی تغییر ندارید.', 'danger');
                } else {
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }


    return (
        <select
            className={disableStatusChange 
                ? 'admin-status-dropdown disbale-dropdown' 
                : 'admin-status-dropdown'}
            // disabled={disableStatusChange}
            onChange={(e) => {
                currentStatus = e.target.value;
                setNewStatus(currentStatus);
                setApplicationStatus(currentStatus);
            }}
            value={newStatus}>
            <option value="not seen" disabled>
                جدید
            </option>
            <option value="accept">
                تایید شده
            </option>
            <option value="reject">
                رد شده
            </option>
            <option value="in progress">
                در حال بررسی
            </option>
        </select>
    );
}

export default ReqStatusDropdown;