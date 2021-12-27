import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import jobsService from '../Service/JobsService';
import apiService from "../Service/APIService";
import '../styles/JobsList.css';

function JobsList() {

    const serviceJobsList = jobsService.getJobsList();
    const [jobsList, setJobsList] = useState(serviceJobsList);



    useEffect(() => {

        apiService.getRequest('https://0.0.0.0:8000/v1/jobs', apiService.handleJobsList, handleErr)
        // API call (setJobsList(data) & jobService.setJobLists(data) -> if data is not empty)

    }, [])

    useEffect(() =>{

        apiService.getRequest();

        


    } , []);

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
                                        className="btn" >
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