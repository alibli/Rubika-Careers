import '../../styles/AdminJobsTable.css';
import Table from '../Core/Table';
import userService from '../../Service/UserService';
import { useEffect, useState } from 'react';
import toastService from '../../Service/ToastService';
import AppsCountModalContainer from './AppsCountModalContainer';
import EditJobModalContainer from './EditJobModalContainer';
import { Link } from 'react-router-dom';
import AddJobModalContainer from './AddJobModalContainer';

function AdminJobsTable() {
    // const customAdminJobsArr = [
    //     {
    //         id: 0,
    //         fields: [
    //             {
    //                 jobTitle: 'برنامه نویس ارشد فرانت'
    //             },
    //             {
    //                 applicationsNum: 10
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <AppsCountModalContainer
    //                         newApplicationsNum={1}
    //                         seenApplicationsNum={3}
    //                         acceptedApplicationsNum={2}
    //                         rejectedApplicationsNum={4}
    //                     />,
    //             },
    //             {
    //                 modalContainer:
    //                     <EditJobModalContainer
    //                         jobId={0}
    //                         isJobDeactive={false}
    //                     />
    //             }
    //         ],
    //         linkers: [
    //             {
    //                 element:
    //                     <Link to={'/admin-panel/0/job-requests'}>
    //                         <i className='fa fa-eye fa-lg'></i>
    //                     </Link>
    //             }
    //         ]
    //     },
    //     {
    //         id: 1,
    //         fields: [
    //             {
    //                 jobTitle: 'مهندس نرم افزار'
    //             },
    //             {
    //                 applicationsNum: 5
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <AppsCountModalContainer
    //                         newApplicationsNum={1}
    //                         seenApplicationsNum={1}
    //                         acceptedApplicationsNum={1}
    //                         rejectedApplicationsNum={2}
    //                     />,
    //             },
    //             {
    //                 modalContainer:
    //                     <EditJobModalContainer
    //                         jobId={1}
    //                         isJobDeactive={true}
    //                     />
    //             }
    //         ],
    //         linkers: [
    //             {
    //                 element:
    //                     <Link to={'admin-panel/1/job-requests'}>
    //                         <i className='fa fa-eye fa-lg'></i>
    //                     </Link>
    //             }
    //         ]
    //     }
    // ];

    const [adminJobs, setAdminJobs] = useState([]);

    async function getAdminJobsList() {
        try {
            const adminJobsRes = await userService.getAdminJobsList();
            const { data } = adminJobsRes;
console.log(data.jobs[0], 'data adminJobResponse');

            let customAdminJobsArr = [];
            data.jobs.forEach(job =>
                customAdminJobsArr.push({
                    id: job.job_id,
                    fields: [
                        {
                            jobTitle: job.title
                        },
                        {
                            applicationsNum: job.total_applications
                        }
                    ],
                    modals: [
                        {
                            modalContainer:
                                <AppsCountModalContainer
                                    newApplicationsNum={job.not_seen_applications}
                                    seenApplicationsNum={job.in_progress_applications}
                                    acceptedApplicationsNum={job.accepted_applications}
                                    rejectedApplicationsNum={job.rejected_applications}
                                />,
                        },
                        {
                            modalContainer:
                                <editJobModalContainer
                                    jobId={job.id}
                                    isJobDeactive={job.is_deactive}
                                    isJobDeactive = {false}
                                />
                        },
                    ],
                    linkers: [
                        {
                            element:
                                <Link to={`/admin-panel/${job.id}/job-requests/`}>
                                    <i className='fa fa-eye fa-lg'></i>
                                </Link>
                        }
                    ]
                }));
            setAdminJobs(customAdminJobsArr);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('احازه ی دسترسی ندارید.', 'danger');
                } else {
console.log(err.response)
                    toastService.showToast(err.response.statusText, 'danger');
                }
            }
            else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

    useEffect(() => {
        getAdminJobsList();
    }, []);

    const columns = [
        { id: 1, name: "عنوان" },
        { id: 2, name: "تعداد درخواست ها " },
        { id: 3, name: "وضعیت" },
        { id: 4, name: "ویرایش" },
        { id: 5, name: "جزییات" },
    ];

    return (
        <div dir='rtl' className='container admin-jobs-table'>
            <AddJobModalContainer />
            <h3> موقعیت های شغلی</h3>
            <Table
                id='table'
                columns={columns}
                rows={adminJobs}>
            </Table>
        </div>
    );
}

export default AdminJobsTable;