import Banner from "./Banner";
import { Link } from "react-router-dom";

import '../styles/Jobs.css';
import Table from "./Core/Table";

function Jobs() {
    return (
        <>
            <div className="container">
                <Banner></Banner>
                <div id="jobs">
                    <p>Jobs</p>
                    <Link to="/job-details">
                        <button>Details</button>
                    </Link>
                </div>
                <Table></Table>
            </div>
        </>
    );
}

export default Jobs;