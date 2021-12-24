import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import '../styles/JobsList.css';

function JobsList() {

    const [jobsList, setJobsList] = useState(jobsService.getJobsList());

    useEffect(() => {
        // API call (setJobsList(data) & jobService.setJobLists(data) -> if data is not empty)
    }, [])

    return (
        <>
            <div className="jobs-list">

                {jobsList.map(job => (
                    <div
                        className="job-title bg-warning rounded"
                        key={job.id}>
                        {job.title}

                        <Link to="/job-details">
                            <button 
                            className="btn"
                            onClick={() => jobsService.setCurrentJobDetails(job.id)}>
                                درخواست
                            </button>
                        </Link>
                    </div>
                ))}

            </div>
        </>
    );
}

export default JobsList;