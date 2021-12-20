import Banner from "./Banner";
import '../styles/Jobs.css';
function Jobs() {
    return (
        <div className="container">
            <Banner></Banner>
            <div id="jobs">
                <p>Jobs</p>
                <button>Details</button>
            </div>
        </div>
    );
}

export default Jobs;