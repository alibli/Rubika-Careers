import ApplyModalContainer from './ApplyModalContainer';
import LoginSignupModal from './LoginSignupModal';
import userService from '../Service/UserService';
import jobsService from "../Service/JobsService";
import toastService from '../Service/ToastService';
import { useState, useEffect } from 'react';
import '../styles/JobDetails.css';
import { Button } from 'react-bootstrap';

function JobDetails(props) {
    // const jobsListValue = [
    //     {
    //         id: 1,
    //         title: 'برنامه‌نویس ارشد فرانت',
    //         description: 'نیازمندی‌ها...',
    //         task: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8',
    //         applied_before: false
    //     },
    //     {
    //         id: 2,
    //         title: 'دیجیتال مارکتر',
    //         description: 'نیازمندی‌ها...',
    //         task: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
    //     },
    //     {
    //         id: 3,
    //         title: 'کارشناس منابع انسانی',
    //         description: 'نیازمندی‌ها...',
    //         task: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
    //     },
    // ];

    const isLoggedin = userService.getLoggedin();
    const [loggedin, setLoggedin] = useState(isLoggedin);

    const [jobDetails, setJobDetails] = useState({});


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
                setJobDetails(data);
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        getJobDetails();
    }, [props.jobId]);

    return (
        <>
            {
                jobDetails.length !== 0 &&
                <div className='job-details'>
                    <h4>
                        {jobDetails.title}
                    </h4>
                    <div className='descript bg-warning rounded'>
                        <p >
                            {jobDetails.description}
                        </p>
                        {
                            jobDetails.task !== null &&
                            <p>
                                <a href={"http://192.168.88.49" + jobDetails.task}>
                                    دانلود فایل تسک
                                </a>
                            </p>
                        }
                    </div>
                    {
                        !loggedin &&
                        <LoginSignupModal
                            buttonLabel="درخواست"
                            variant="danger"
                            id="apply" />
                    }
                    {
                        loggedin && !jobDetails.applied_before &&
                        <ApplyModalContainer jobId={props.jobId} />
                    }

                    {
                        loggedin && jobDetails.applied_before &&
                        <Button
                            variant='danger'
                            disabled
                            id="disabled-apply">
                            قبلاْ درخواست داده اید
                        </Button>
                    }
                </div >
            }
        </>
    );
}

export default JobDetails;