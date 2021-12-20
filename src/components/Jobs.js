import { Link } from "react-router-dom";

function Jobs() {
    return (
        <div>
            <p>Jobs</p>
            <Link to="/job-details">
                <button>Details</button>
            </Link>

        </div>
    );
}

export default Jobs;