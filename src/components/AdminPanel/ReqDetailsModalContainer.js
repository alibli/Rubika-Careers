import { useState } from 'react';
import ReqDetailsModal from './ReqDetailsModal';

function ReqDetailsModalContainer(props) {
    const [reqDetailsModalShow, setReqDetailsModalShow] = useState(false);


    return (
        <div className='req-datails-modal'>

            <i
                className='fa fa-eye fa-lg'
                onClick={() => setReqDetailsModalShow(true)}>
            </i>

            <ReqDetailsModal
                show={reqDetailsModalShow}
                onHide={() => setReqDetailsModalShow(false)} 
                {...props} />
        </div >
    );
}

export default ReqDetailsModalContainer;
