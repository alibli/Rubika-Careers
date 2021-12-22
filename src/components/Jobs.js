import Banner from "./Banner";
import '../styles/Jobs.css';
import Table from "./Core/Table";
function Jobs() {
    return (
        <div className="container">
            <Banner></Banner>
            <div id="jobs">
                <p>Jobs</p>
                <button>Details</button>
            </div>
            <Table></Table>
        </div>
    );
}

export default Jobs;