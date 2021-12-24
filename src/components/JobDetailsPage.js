import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobDetails from "./JobDetails";

function JobDetailsPage() {
    return (
        <>
            <div className="job-details-page">
                <Banner></Banner>
                <JobDetails />
            </div>
        </>
    );
}

export default JobDetailsPage;