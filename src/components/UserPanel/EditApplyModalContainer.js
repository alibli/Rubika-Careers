import ApplyModal from '../ApplyModal';
import { useState } from 'react';
import applicationService from '../../Service/ApplicationService';
import toastService from '../../Service/ToastService';
import '../../styles/EditApplyModalContainer.css'

function EditApplyModalContainer(props) {

    const [editApplyModalShow, setEditApplyModalShow] = useState(false);
    const [initialData, setInitialData] = useState({});

    // function initialModalData(data){
    //     if(editApplyModalShow){
    //         console.log(data);
    //         return data;
    //     }
    // }


    

    async function editApplication(editedApplyInfo, applicationId) {
        console.log(editedApplyInfo);
        try {
            const editApplyRes = await applicationService.editJobApplication(editedApplyInfo, applicationId);
console.log(editApplyRes);
            if (editApplyRes.status === 200) {
                toastService.showToast('درخواست شما با موفقیت به روزرسانی شد.', 'success');
                // setTimeout(() => {
                    // window.location.reload();
                // }, 2000);
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('امکان به روز رسانی درخواست وجود ندارد.', 'danger');
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
        
        <div className='edit-apply-modal'>
            <i
                className="fa fa-eye fa-lg"
                onClick={() => setEditApplyModalShow(true)}>
            </i>

            <ApplyModal
                show={editApplyModalShow}
                onHide={() => setEditApplyModalShow(false)}
                btnLabel="ویرایش"
                editApplication={(editedInfo, id) =>{
                    // initialModalData(editedInfo)
                    editApplication(editedInfo, id)   /* editedInfo?? */
                }
                }
                {...props} />
        </div >
    );
}

export default EditApplyModalContainer;
