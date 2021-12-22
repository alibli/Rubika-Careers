import Banner from "./Banner";
import '../styles/Jobs.css';
import Table from "./Core/Table";
function Jobs() {
    return (
        <>
            <Banner></Banner>
            <div className="container">
                <div id="jobs">
                    <p>Jobs</p>
                    <button>Details</button>
                </div>
                {/* <Table></Table> */}
            </div>
        </>
    );
}

export default Jobs;