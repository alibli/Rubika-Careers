import { useEffect, useState } from 'react';
import '../../styles/Notification.css';

function Notification({message , alertModel}) {     
    //example : alertModel={alert-primary}
   const [isShowing , setShow] = useState(true); 

    
    useEffect(() =>{
        setTimeout(() => {
            setShow(false); 
        }, 3000);
    });

    return (
        <div dir='rtl' className="container" id='notification'>
            <div className={`alert alert-dismissible fade${isShowing ? ' show' : ''} ${alertModel}`} role="alert">
                 {message}
            </div>
        </div>
    );

}
export default Notification;