import Banner from "./Banner";
import '../styles/JobsPage.css';
import JobsList from "./JobsList";
import BackForwardBtn from "./Core/BackForwardBtn";

function JobsPage() {
    return (
        <>
            <div className="jobs-page">
                <Banner></Banner>
                <BackForwardBtn />
                <JobsList />
            </div>
        </>
    );
}

export default JobsPage;