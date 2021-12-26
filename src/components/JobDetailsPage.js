import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobDetails from "./JobDetails";
import { useParams } from "react-router-dom";

function JobDetailsPage() {
    let params = useParams();

    return (
        <>
            <div className="job-details-page">
                <Banner></Banner>
                <JobDetails jobId={params.jobId} />
            </div>
        </>
    );
}

export default JobDetailsPage;