import '../../styles/EditJobModalContainer.css';
import EditJobModal from './EditJobModal';
import { useState } from 'react';
import AppsCountModal from './AppsCountModal';
import '../../styles/AppsCountModalContainer.css';

function AppsCountModalContainer(props) {
    const [appsCountModalShow, setAppsCountModalShow] = useState(false);

    return (
        <div className='apps-count-modal'>

            <i
                className="fa fa-search fa-lg"
                onClick={() => setAppsCountModalShow(true)}>
            </i>

            <AppsCountModal
                show={appsCountModalShow}
                onHide={() => setAppsCountModalShow(false)}
                {...props}
            />
        </div >
    );
}

export default AppsCountModalContainer;
