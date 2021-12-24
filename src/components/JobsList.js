import { Link } from "react-router-dom";

function JobsList() {
    return (
        <>
            <div className="jobs">
               
                    <Link to="/job-details">
                        <button>Details</button>
                    </Link>
                
            </div>
        </>
    );
}

export default JobsList;