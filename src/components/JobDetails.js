/* eslint-disable react/jsx-no-target-blank */
import ApplyModalContainer from './ApplyModalContainer';
import LoginSignupModal from './LoginSignupModal';
import userService from '../Service/UserService';
import jobsService from "../Service/JobsService";
import toastService from '../Service/ToastService';
import { useState, useEffect } from 'react';
import '../styles/JobDetails.css';

function JobDetails(props) {
    const jobsListValue = [
        {
            id: 1,
            title: 'برنامه‌نویس ارشد فرانت',
            description: 'نیازمندی‌ها...',
            taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
        },
        {
            id: 2,
            title: 'دیجیتال مارکتر',
            description: 'نیازمندی‌ها...',
            taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
        },
        {
            id: 3,
            title: 'کارشناس منابع انسانی',
            description: 'نیازمندی‌ها...',
            taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
        },
    ];

    const isLoggedin = userService.getLoggedin();
    const [loggedin, setLoggedin] = useState(isLoggedin);

    const [jobDetails, setJobDetails] = useState([jobsListValue[0]]);


    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
                setLoggedin(true);
                break;

            case 'USER-LOGOUT':
                setLoggedin(false);
                break;

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

    async function getJobDetails() {
        try {
            const jobDetailsResponse = await jobsService.getJobDetails(props.jobId);
            const { data } = jobDetailsResponse;
            if (data.is_deactive ||
                data.is_deleted) {
                toastService.showToast('در حال حاضر موقعیت شغلی مورد نظر فعال نیست', 'warning');
            } else {
                setJobDetails(jobDetailsResponse.data);
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    // useEffect(() => {
    //     getJobDetails();
    // }, [jobId]);

    return (
        <>
            {
                jobDetails.map(job => (
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
                                    href={job.task}
                                    target="_blank">
                                    دانلود فایل تسک
                                </a>
                            </p>
                        </div>
                        {
                            loggedin
                                ? <ApplyModalContainer jobId={props.jobId}/>
                                : <LoginSignupModal
                                    buttonLabel="درخواست"
                                    variant="danger"
                                    id="apply" />
                        }
                    </div >
                ))
            }
        </>
    );
}

export default JobDetails;