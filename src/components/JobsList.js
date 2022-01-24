import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import toastService from "../Service/ToastService";
import '../styles/JobsList.css';

function JobsList() {
    // const jobsListValue = [
    //     {
    //         id: 1,
    //         title: 'برنامه‌نویس ارشد فرانت',
    //         description: 'نیازمندی‌ها...',
    //         taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
    //     },
    //     {
    //         id: 2,
    //         title: 'دیجیتال مارکتر',
    //         description: 'نیازمندی‌ها...',
    //         taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
    //     },
    //     {
    //         id: 3,
    //         title: 'کارشناس منابع انسانی',
    //         description: 'نیازمندی‌ها...',
    //         taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
    //     },
    // ];

    const [jobsList, setJobsList] = useState([]);

    const getJobsList = async () => {
        try {
            const jobsListRes = await jobsService.getJobsList();
            const { data } = jobsListRes;
            if (data.length === 0) {
                toastService.showToast('در حال حاضر موقعیت شغلی فعالی وجود ندارد', 'warning');
            } else {
                setJobsList(data);
            }
        }
        catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        getJobsList();
    }, []);


    return (
        <div className="jobs-list">
            {
                jobsList.map(job => (
                    <div
                        className="job-title bg-warning rounded"
                        key={job.id}>
                        {job.title}
                        <Link to={`/job-details/${job.id}`}>
                            <button
                                className="btn" >
                                درخواست
                            </button>
                        </Link>
                    </div>
                ))
            }
        </div>
    );

}

export default JobsList;