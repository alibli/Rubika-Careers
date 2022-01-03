import { useEffect, useState } from 'react';
import '../../styles/Notification.css';
import toastService from '../../Service/ToastService';

function Notification() {

    const [isShowing, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [alertModel, setAlertModel] = useState('');


    const toastObserver = e => {

        switch (e.action) {
            case 'SHOW-TOAST':
                setShow(true);
                setMessage(e.message);
                setAlertModel(e.alertModel);

                setTimeout(() => {
                    setShow(false);
                }, 3000);
                break;

            default:
                break;
        }
    }

    toastService.toastSubject.subscribe(toastObserver);

    return (
        <div dir='rtl' className="container" id='notification'>
            <div className={`alert alert-dismissible fade${isShowing ? ' show' : ''} alert-${alertModel}`} role="alert">
                {message}
            </div>
        </div>
    );

}
export default Notification;