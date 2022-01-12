import '../../styles/AdminRequestsTable.css';
import Table from '../Core/Table';
import userService from '../../Service/UserService';
import { useEffect, useState } from 'react';
import toastService from '../../Service/ToastService';
import AppsCountModalContainer from './AppsCountModalContainer';
import EditJobModalContainer from './EditJobModalContainer';

function AdminJobsTable() {
    const customAdminJobsArr = [
        {
            id: 0,
            fields: [
                {
                    jobTitle: 'برنامه نویس ارشد فرانت'
                },
                {
                    applicationsNum: 10
                }
            ],
            modals: [
                {
                    modalContainer:
                        <AppsCountModalContainer
                            newApplicationsNum={1}
                            seenApplicationsNum={3}
                            acceptedApplicationsNum={2}
                            rejectedApplicationsNum={4}
                        />,
                },
                {
                    modalContainer:
                        <EditJobModalContainer
                            jobId={0}
                            isJobDeactive={false}
                        />
                }
            ]
        },
        {
            id: 1,
            fields: [
                {
                    jobTitle: 'مهندس نرم افزار'
                },
                {
                    applicationsNum: 5
                }
            ],
            modals: [
                {
                    modalContainer:
                        <AppsCountModalContainer
                            newApplicationsNum={1}
                            seenApplicationsNum={1}
                            acceptedApplicationsNum={1}
                            rejectedApplicationsNum={2}
                        />,
                },
                {
                    modalContainer:
                        <EditJobModalContainer
                            jobId={1}
                            isJobDeactive={true}
                        />
                }
            ]
        }
    ];

    const [adminJobs, setAdminJobs] = useState(customAdminJobsArr);

    // async function getAdminJobsList() {
    //     try {
    //         const adminJobsRes = await userService.getAdminJobsList();
    //         const { data } = adminJobsRes.data;
    //         let customAdminJobsArr = [];
    //         data.job_offers.forEach(job =>
    //             customAdminJobsArr.push({
    //                 id: job.job_id,
    //                 fields: [
    //                     {
    //                         jobTitle: job.job_title
    //                     },
    //                     {
    //                         applicationsNum: job.number_of_applications.total
    //                     }
    //                 ],
    //                 modals: [
    //                     {
    //                         modalContainer:
    //                             <AppsCountModalContainer
    //                                 newApplicationsNum={job.number_of_applications.unknown_status}
    //                                 seenApplicationsNum={job.number_of_applications.in_progress}
    //                                 acceptedApplicationsNum={job.number_of_applications.accepted}
    //                                 rejectedApplicationsNum={job.number_of_applications.rejected}
    //                             />,
    //                     },
    //                     {
    //                         modalContainer:
    //                             <editJobModalContainer 
    //                             jobId={job.job_id}
    //                             isJobDeactive={job.is_deactive}
    //                              />
    //                     },
    //                 ]
    //             }));
    //         setAdminJobs(customAdminJobsArr);
    //     } catch (err) {
    //         toastService.showToast(err.message, 'danger');
    //     }
    // }

    // useEffect(() => {
    //     getAdminJobsList();
    // }, []);

    const columns = [
        { id: 1, name: "عنوان" },
        { id: 2, name: "تعداد درخواست ها " },
        { id: 3, name: "وضعیت" },
        { id: 4, name: "ویرایش" }
    ];

    return (
        <div dir='rtl' className='container admin-jobs-table'>
            <button className='btn btn-warning' id='add-job-btn'>
                افزودن موقعیت شغلی
            </button>
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