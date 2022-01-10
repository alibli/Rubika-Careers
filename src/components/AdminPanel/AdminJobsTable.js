import jobsService from '../../Service/JobsService';
import '../../styles/AdminRequestsTable.css';
import Table from '../Core/Table';

function AdminJobsTable() {
    const [adminJobs, setAdminJobs] = useState([]);

    const columns = [
        { id: 1, name: "عنوان" },
        { id: 2, name: "تعداد درخواست ها " },
        { id: 3, name: "وضعیت" },
        { id: 4, name: "جزییات" },
        { id: 5, name: "تغییر" }
    ];

    const rList = [
        { id: 0, fields: ["front-end1", "5"] },
        { id: 1, fields: ["front-end2", "10"] },
        { id: 2, fields: ["front-end3", "19"] },
        { id: 3, fields: ["front-end4", "7"] }
    ];

    async function getAdminJobsList() {
        try {
            adminJobsRes = await jobsService.getAdminJobsList();
            const { data } = userProfileRes.data;
            let customAdminJobsArr = [];
            data.job_offers.forEach(job =>
                customAdminJobsArr.push({
                    id: job.job_id,
                    fields: [
                        {
                            jobTitle: job.job_title
                        },
                        {
                            applicationsNum: job.number_of_applications.total
                        }
                    ],
                    applicationsCountModal: 
                        <ApplicationsCountModal />,
                    detailsModal:
                        <JobDetailsModal />,
                    editModal:
                        <editJobPositionModal />
                }));
            setApplications(customApplicationsArr);
        } catch (err) {

        }
    }

    return (
        <div dir='rtl' className='container'>
            <button className='btn' id='addJobBtn'>
                افزودن موقعیت شغلی
            </button>
            <Table
                id='table'
                columns={columns}
                rows={rows}>
            </Table>
        </div>
    );
}

export default AdminJobsTable;