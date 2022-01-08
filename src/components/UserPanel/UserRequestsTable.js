import '../../styles/UserRequestsTable.css';
import Table from '../Core/Table';
import userService from '../../Service/UserService';
import { useEffect, useState } from 'react';
import toastService from '../../Service/ToastService';
import EditApplyModal from './EditApplyModal';

function UserRequestsTable() {
    const rows = [
        {
            id: 0,
            fields: ["front-end", "1/1/1400", "Unknown"],
            details:
                <EditApplyModal
                    applicationId='0'
                    result_state="Unknown"
                    salary={5000000}
                    contract_interest={36}
                    resume='https://www.google.com/search?q=resume&oq=resume&aqs=chrome..69i57.1182j0j7&sourceid=chrome&ie=UTF-8'
                    task_solution='https://www.google.com/search?q=task+solution&sxsrf=AOaemvKcnmXOUcWSYUg7CdK0r5u3IW0qPQ%3A1641632069286&ei=RVHZYaDUEJGO9u8Px8KJ4Ao&ved=0ahUKEwjgit2C5KH1AhURh_0HHUdhAqwQ4dUDCA8&uact=5&oq=task+solution&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwAzoHCAAQsAMQQzoECCMQJzoECAAQQzoHCCMQ6gIQJzoLCC4QgAQQxwEQ0QM6CgguEMcBEKMCEEM6CgguEMcBENEDEEM6BAguEEM6BQguEIAEOgUIABCRAjoHCAAQgAQQCjoKCAAQgAQQhwIQFDoICAAQgAQQyQNKBAhBGABKBAhGGABQ1QxYoDRg7TZoBnACeASAAYEDiAGnIpIBCDAuMTQuNi4ymAEAoAEBsAEKyAEKwAEB&sclient=gws-wiz'
                />
        },
        {
            id: 1,
            fields: ["UI/UX", "10/7/1400", "rejected"],
            details:
                <EditApplyModal
                    applicationId='1'
                    result_state="rejected"
                    salary={6000000}
                    contract_interest={24}
                    resume='https://www.google.com/search?q=resume&oq=resume&aqs=chrome..69i57.1182j0j7&sourceid=chrome&ie=UTF-8'
                    task_solution='https://www.google.com/search?q=task+solution&sxsrf=AOaemvKcnmXOUcWSYUg7CdK0r5u3IW0qPQ%3A1641632069286&ei=RVHZYaDUEJGO9u8Px8KJ4Ao&ved=0ahUKEwjgit2C5KH1AhURh_0HHUdhAqwQ4dUDCA8&uact=5&oq=task+solution&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwAzoHCAAQsAMQQzoECCMQJzoECAAQQzoHCCMQ6gIQJzoLCC4QgAQQxwEQ0QM6CgguEMcBEKMCEEM6CgguEMcBENEDEEM6BAguEEM6BQguEIAEOgUIABCRAjoHCAAQgAQQCjoKCAAQgAQQhwIQFDoICAAQgAQQyQNKBAhBGABKBAhGGABQ1QxYoDRg7TZoBnACeASAAYEDiAGnIpIBCDAuMTQuNi4ymAEAoAEBsAEKyAEKwAEB&sclient=gws-wiz'
                />
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
    //                     details:
    //                         <EditApplyModal
    //                                 applicationId={application.id}
    //                             result_state={application.fields[2]}
    //                             salary={application.details[0]}
    //                             contract_interest={application.details[1]}
    //                             resume={application.details[2]}
    //                             task_solution={application.details[3]} />
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

    return (
        <div dir='rtl' className='container user-requests-table'>
            <h3>درخواست ها</h3>
            <Table
                id='table'
                columns={columns}
                rows={applications}>
            </Table>
        </div>
    );

}

export default UserRequestsTable;