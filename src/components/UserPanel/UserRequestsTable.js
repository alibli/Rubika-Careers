import '../../styles/UserRequestsTable.css';
import Table from '../Core/Table';
import userService from '../../Service/UserService';
import { useEffect, useState } from 'react';
import toastService from '../../Service/ToastService';
import EditRequestModal from './EditRequestModal';

function UserRequestsTable() {
    const rows = [
        { id: 0, 
            fields: ["front-end1", "1/1/1400", "rejected"],
            details: [5000000, '1 سال', '', '']
        }
    ];

    const [applications, setApplications] = useState(rows);

    // useEffect(() => {
    //     const response = userService.getUserProfile();
    //     response
    //         .then(({ data }) => {
    //             let applicationsArray = [];
    //             data.applications.forEach(application =>
    //                 applicationsArray.push({
    //                     id: application.id,
    //                     fields: [
    //                         application.job_title,
    //                         application.created_at,
    //                         application.result_status
    //                     ],
    //                     details: [
    //                         application.salary,
    //                         application.contract_interest,
    //                         application.resume,
    //                         application.task_solution
    //                     ]
    //                 }));
    //             setApplications(applicationsArray);
    //         })
    //         .catch((err) => {
    //             toastService.showToast(err.message, 'danger');
    //         });
    // }, [])

    const columns = [
        { id: 1, name: "عنوان" },
        { id: 2, name: "تاریخ درخواست" },
        { id: 3, name: "وضعیت" },
        { id: 4, name: "جزییات" }
    ];

    
    const actions = [
        {
            caption: <EditRequestModal
                     btnLabel="ویرایش"/> 
        }
    ];


    return (
        <div dir='rtl' className='container user-requests-table'>
            <h3>درخواست ها</h3>
            <Table
                id='table'
                actions={actions}
                columns={columns}
                rows={applications}>
            </Table>
        </div>
    );

}

export default UserRequestsTable;