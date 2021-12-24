import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobsList from "./JobsList";

function Jobs() {
    return (
        <>
            <div className="jobs">
                <Banner></Banner>
                <JobsList />
            </div>
        </>
    );
}

export default Jobs;