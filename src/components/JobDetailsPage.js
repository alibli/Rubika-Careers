import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobDetails from "./JobDetails";
import { useParams } from "react-router-dom";
import '../styles/JobDetailsPage.css';
import BackForwardBtn from "./Core/BackForwardBtn";

function JobDetailsPage() {
    let URLParams = useParams();

    return (
        <>
            <div className="job-details-page">
                <Banner></Banner>
                <BackForwardBtn />
                <JobDetails jobId={URLParams.jobId} />
            </div>
        </>
    );
}

export default JobDetailsPage;