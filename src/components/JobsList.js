import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import apiService from "../Service/APIService";
import '../styles/JobsList.css';

function JobsList() {

    const serviceJobsList = jobsService.getJobsList();
    const [jobsList, setJobsList] = useState(serviceJobsList);

    // const jobsListObserver = e => {
    //     switch (e.action) {
    //         case 'JOBS-LIST-FILEED':
    //             const jobsListValue = jobsService.getJobsList();
    //             setJobsList(jobsListValue);
    //             break;

    //         default:
    //             break;
    //     }
    // }

    // useEffect(() => {
    //     jobsService.jobsListSubject.subscribe(jobsListObserver);

    //     const handleResponse = apiService.handleJobsList;
    //     const handleErr = apiService.handleError;
    //     apiService.getRequest('https://0.0.0.0:8000/v1/jobs', handleResponse, handleErr)
    //     // API call (setJobsList(data) & jobService.setJobLists(data) -> if data is not empty)

    //     return () => {
    //         jobsService.jobsListSubject.unsubscribe(jobsListObserver);
    //     }
    // }, [])

    return (
        <>
            <div className="jobs-list">
                {
                    jobsList.length !== 0

                        ?
                        jobsList.map(job => (
                            <div
                                className="job-title bg-warning rounded"
                                key={job.id}>
                                {job.title}

                                <Link to={`/job-details/${job.id}`}>
                                    <button
                                        className="btn">
                                        درخواست
                                    </button>
                                </Link>
                            </div>
                        ))

                        :
                        <div className="job-title bg-warning rounded">
                            در حال حاضر موقعیتی وجود ندارد.
                        </div>

                }

            </div>
        </>
    );
}

export default JobsList;