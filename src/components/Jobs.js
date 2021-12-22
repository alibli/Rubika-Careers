// import Banner from "./Banner";
import { Link } from "react-router-dom";

import '../styles/Jobs.css';
function Jobs() {
    return (
        <div className="container">
            {/* <Banner></Banner> */}

            <div id="jobs">
                <p>Jobs</p>
                <Link to="/job-details">
                <button>Details</button>
            </Link>
            </div>
        </div>
    );
}

export default Jobs;