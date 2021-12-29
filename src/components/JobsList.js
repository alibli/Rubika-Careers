import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import '../styles/JobsList.css';

function JobsList() {
    // const jobsList = [
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


    useEffect(() => {
        const res = jobsService.getJobsList();

        if(res) {
            setJobsList(res);
        }

    }, []);


    return (
        <>
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
        </>
    );

}

export default JobsList;