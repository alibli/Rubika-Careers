/* eslint-disable react/jsx-no-target-blank */
import ApplyModalContainer from './ApplyModalContainer';
import LoginSignupModal from './LoginSignupModal';
import userService from '../Service/UserService';
import jobsService from "../Service/JobsService";
import { useState, useEffect } from 'react';
import '../styles/JobDetails.css';

function JobDetails() {
    const [loggedin, setLoggedin] = useState(userService.getLoggedin());

    const [jobDetails, setJobDetails] = useState(jobsService.getCurrentJobDetails());

    const detailsObserver = (e) => {
        console.log(e)
        switch (e.action) {
            case 'JOB-CHOSEN':
                setJobDetails(jobsService.getCurrentJobDetails());
                break;
            default:
                break;
        }
    }

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
            case 'USER-LOGOUT':
            case 'STORAGE-CHANGE':
                setLoggedin(userService.getLoggedin());
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        jobsService.jobDetailsSubject.subscribe(detailsObserver);
        userService.userSubject.subscribe(userObserver);

        return () => {
            jobsService.jobDetailsSubject.unsubscribe(detailsObserver);
            userService.userSubject.unsubscribe(userObserver);
        };
    }, []);

    return (
        <>
            {jobDetails.map(job => (
                <div
                    className='job-details'
                    key={job.id}>
                    <h4>
                        {job.title}
                    </h4>
                    <div className='descript bg-warning rounded'>
                        <p >
                            {job.description}
                        </p>
                        <p>
                            <a
                                href={job.taskURL}
                                target="_blank">
                                دانلود فایل تسک
                            </a>
                        </p>
                    </div>


                    {
                        loggedin
                            ? <ApplyModalContainer />
                            : <LoginSignupModal
                                buttonLabel="درخواست"
                                variant="danger"
                                id="apply"
                                style={{
                                    outline: 'none !important',
                                    backgroundColor: '#803333 !important',
                                    color: 'whitesmoke !important',
                                    'margin': 'auto'
                                 }} />
                    }
                </div >
            ))}
        </>
    );
}

export default JobDetails;