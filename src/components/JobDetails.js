import ApplyModalContainer from './ApplyModalContainer';
import LoginSignupModal from './LoginSignupModal';
import userService from '../Service/UserService';
import { useState, useEffect } from 'react';

function JobDetails() {
    const [loggedin, setLoggedin] = useState(userService.getLoggedin());

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGGIN':
                setLoggedin(userService.getLoggedin());
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return userService.userSubject.unsubscribe(userObserver);

    }, []);

    return (
        <div>
            <p>Job Title</p>
            <p>Job Description</p>
            <p>Task</p>

            {
                loggedin
                    ? <ApplyModalContainer />
                    : <LoginSignupModal buttonLabel="درخواست" />
            }
        </div >
    );
}

export default JobDetails;