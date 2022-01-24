import '../../styles/UserRequestsTable.css';
import Table from '../Core/Table';
import userService from '../../Service/UserService';
import { useEffect, useState } from 'react';
import toastService from '../../Service/ToastService';
import EditApplyModalContainer from './EditApplyModalContainer';

function UserApplicationsTable() {
    const customApplicationsArr = [
        {
            id: 0,
            fields: [
                {
                    jobTitle: "front-end"
                },
                {
                    applyDate: "1/1/1400"
                },
                {
                    applyState: "جدید"
                }
            ],
            modals: [
                {
                    modalContainer:
                        <EditApplyModalContainer
                            applicationId='0'
                            jobId='1'
                            applyState="unknown"
                            salaryInterest={5000000}
                            durationInterest={36}
                            resumeURL='https://www.google.com/search?q=resume&oq=resume&aqs=chrome..69i57.1182j0j7&sourceid=chrome&ie=UTF-8'
                            taskAnswerURL='https://www.google.com/search?q=task+solution&sxsrf=AOaemvKcnmXOUcWSYUg7CdK0r5u3IW0qPQ%3A1641632069286&ei=RVHZYaDUEJGO9u8Px8KJ4Ao&ved=0ahUKEwjgit2C5KH1AhURh_0HHUdhAqwQ4dUDCA8&uact=5&oq=task+solution&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwAzoHCAAQsAMQQzoECCMQJzoECAAQQzoHCCMQ6gIQJzoLCC4QgAQQxwEQ0QM6CgguEMcBEKMCEEM6CgguEMcBENEDEEM6BAguEEM6BQguEIAEOgUIABCRAjoHCAAQgAQQCjoKCAAQgAQQhwIQFDoICAAQgAQQyQNKBAhBGABKBAhGGABQ1QxYoDRg7TZoBnACeASAAYEDiAGnIpIBCDAuMTQuNi4ymAEAoAEBsAEKyAEKwAEB&sclient=gws-wiz'
                        />
                }
            ],
            linkers: []
        },
        {
            id: 1,
            fields: [
                {
                    jobTitle: "UI/UX"
                },
                {
                    applyDate: "10/7/1400"
                },
                {
                    applyState: "رد شده"
                }
            ],
            modals: [
                {
                    modalContainer:
                        <EditApplyModalContainer
                            applicationId='1'
                            jobId='0'
                            applyState="rejected"
                            salaryInterest={6000000}
                            durationInterest={24}
                            resumeURL='https://www.google.com/search?q=resume&oq=resume&aqs=chrome..69i57.1182j0j7&sourceid=chrome&ie=UTF-8'
                            taskAnswerURL='https://www.google.com/search?q=task+solution&sxsrf=AOaemvKcnmXOUcWSYUg7CdK0r5u3IW0qPQ%3A1641632069286&ei=RVHZYaDUEJGO9u8Px8KJ4Ao&ved=0ahUKEwjgit2C5KH1AhURh_0HHUdhAqwQ4dUDCA8&uact=5&oq=task+solution&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwAzoHCAAQsAMQQzoECCMQJzoECAAQQzoHCCMQ6gIQJzoLCC4QgAQQxwEQ0QM6CgguEMcBEKMCEEM6CgguEMcBENEDEEM6BAguEEM6BQguEIAEOgUIABCRAjoHCAAQgAQQCjoKCAAQgAQQhwIQFDoICAAQgAQQyQNKBAhBGABKBAhGGABQ1QxYoDRg7TZoBnACeASAAYEDiAGnIpIBCDAuMTQuNi4ymAEAoAEBsAEKyAEKwAEB&sclient=gws-wiz'
                        />
                }
            ],
            linkers: []
        }
    ];

    const [applications, setApplications] = useState(customApplicationsArr);

    const applyStateInPersian = {
        'unknown': 'جدید',
        'in progress': 'در حال بررسی', 
        'accept': 'تایید شده',
        'reject': 'رد شده'
    }

    async function getUserApplications() {
        try {
            const userProfileRes = await userService.getUserProfile();
            const { data } = userProfileRes;
            let customApplicationsArr = [];
            data.applications.forEach(application =>
                customApplicationsArr.push({
                    id: application.id,
                    fields: [
                        {
                            jobTitle: application.job_title
                        },
                        {
                            applyDate: application.created_at
                        },
                        {
                            applyState: applyStateInPersian[application.result_status]
                        }
                    ],
                    modals: [
                        {
                            modalContainer:
                                <EditApplyModalContainer
                                    applicationId={application.id}
                                    applyState={application.created_at}
                                    salaryInterest={application.salary}
                                    durationInterest={application.contract_interest}
                                    resumeURL={application.resume}
                                    taskAnswerURL={application.task_solution} />
                        }
                    ],
                    linkers: []
                }));
            setApplications(customApplicationsArr);
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        getUserApplications();
    }, [])

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

export default UserApplicationsTable;