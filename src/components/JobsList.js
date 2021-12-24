import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import '../styles/JobsList.css';

function JobsList() {

    const [jobsList, setJobsList] = useState(jobsService.getJobsList());

    useEffect(() => {
        // API call
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
                            <button className="btn">
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