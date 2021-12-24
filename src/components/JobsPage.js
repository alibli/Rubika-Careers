import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobsList from "./JobsList";

function JobsPage() {
    return (
        <>
            <div className="jobs-page">
                <Banner></Banner>
                <JobsList />
            </div>
        </>
    );
}

export default JobsPage;