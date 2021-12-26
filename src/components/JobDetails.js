/* eslint-disable react/jsx-no-target-blank */
import ApplyModalContainer from './ApplyModalContainer';
import LoginSignupModal from './LoginSignupModal';
import userService from '../Service/UserService';
import jobsService from "../Service/JobsService";
import { useState, useEffect } from 'react';
import '../styles/JobDetails.css';

function JobDetails({ jobId }) {

    const loggedinValue = userService.getLoggedin();
    const [loggedin, setLoggedin] = useState(loggedinValue);

    const [jobDetails, setJobDetails] = useState([]);


    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
            case 'USER-LOGOUT':
            case 'STORAGE-CHANGE':
                const loggedinValue = userService.getLoggedin();
                setLoggedin(loggedinValue);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return () => {
            userService.userSubject.unsubscribe(userObserver);
        };
    }, []);

    useEffect(() => {
        const jobDetails = jobsService.getJobDetailsById(jobId);
        setJobDetails(jobDetails);
    }, [jobId]);

    return (
        <>
            {
                typeof (jobDetails) === 'object'
                    ?
                    jobDetails.map(job => (
                        <div
                            className='job-details'
                            key={job.id}>
                            <></>
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
                                        id="apply" />
                            }
                        </div >
                    ))

                    :

                    <div className='job-details'>
                        <p>موقعیت شغلی مورد نظر یافت نشد.</p>
                    </div>
            }

        </>
    );
}

export default JobDetails;