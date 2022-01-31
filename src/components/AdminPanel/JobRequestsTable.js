import '../../styles/JobRequestsTable.css';
import Table from '../Core/Table';
import FilterRequests from './FilterRequests';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReqStatusDropdown from './ReqStatusDropdown';
import jobsService from '../../Service/JobsService';
import toastService from '../../Service/ToastService';
import ReqDetailsModalContainer from './ReqDetailsModalContainer';

var filteredStatuses = [];

function JobRequestsTable() {
    // const customJobReqsArr = [
    //     {
    //         id: 10,
    //         fields: [
    //             {
    //                 reqName: 'علی علوی'
    //             },
    //             {
    //                 reqDate: '۱۴۰۰/۰۳/۰۱'
    //             },
    //             {
    //                 reqStatusDropdown:
    //                     <ReqStatusDropdown
    //                         jobId={0}
    //                         reqId={10}
    //                         reqStatus='unknown' />
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <ReqDetailsModalContainer
    //                         reqSalaryInterest={6000000}
    //                         reqDurationInterest={12}
    //                         reqResumeLink={''}
    //                         reqTaskSolutionLink={''}
    //                     />,
    //             }
    //         ],
    //         linkers: [],
    //         status: 'unknown'
    //     },
    //     {
    //         id: 11,
    //         fields: [
    //             {
    //                 reqName: 'فاطمه فاطمی'
    //             },
    //             {
    //                 reqDate: '۱۴۰۰/۰۷/۰۱'
    //             },
    //             {
    //                 reqStatusDropdown:
    //                     <ReqStatusDropdown
    //                         jobId={0}
    //                         reqId={11}
    //                         reqStatus='accept' />
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <ReqDetailsModalContainer
    //                         reqSalaryInterest={5000000}
    //                         reqDurationInterest={18}
    //                         reqResumeLink={''}
    //                         reqTaskSolutionLink={''}
    //                     />,
    //             }
    //         ],
    //         linkers: [],
    //         status: 'accept'
    //     },
    //     {
    //         id: 12,
    //         fields: [
    //             {
    //                 reqName: 'حسین حسینی'
    //             },
    //             {
    //                 reqDate: '۱۴۰۰/۰۸/۰۱'
    //             },
    //             {
    //                 reqStatusDropdown:
    //                     <ReqStatusDropdown
    //                         jobId={0}
    //                         reqId={12}
    //                         reqStatus='in progress' />
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <ReqDetailsModalContainer
    //                         reqSalaryInterest={5000000}
    //                         reqDurationInterest={18}
    //                         reqResumeLink={''}
    //                         reqTaskSolutionLink={''}
    //                     />,
    //             }
    //         ],
    //         linkers: [],
    //         status: 'in progress'
    //     },
    //     {
    //         id: 13,
    //         fields: [
    //             {
    //                 reqName: 'احمد احمدی'
    //             },
    //             {
    //                 reqDate: '۱۴۰۰/۰۹/۰۱'
    //             },
    //             {
    //                 reqStatusDropdown:
    //                     <ReqStatusDropdown
    //                         jobId={0}
    //                         reqId={13}
    //                         reqStatus='reject' />
    //             }
    //         ],
    //         modals: [
    //             {
    //                 modalContainer:
    //                     <ReqDetailsModalContainer
    //                         reqSalaryInterest={5000000}
    //                         reqDurationInterest={18}
    //                         reqResumeLink={''}
    //                         reqTaskSolutionLink={''}
    //                     />,
    //             }
    //         ],
    //         linkers: [],
    //         status: 'reject'
    //     }
    // ];


    const URLParams = useParams();

    const [jobRequests, setJobRequests] = useState([]);

    var customJobReqsArr = [];
    const getJobRequests = async () => {
        try {
            const jobReqsRes = await jobsService.getJobRequests(URLParams.jobId);
            const res  = jobReqsRes.data.applications; /** */
console.log(res);
            res.forEach(req =>
                customJobReqsArr.push({
                    id: req.id,
                    fields: [
                        {
                            reqName: req.user_full_name
                        },
                        {
                            reqDate: req.created_at
                        },
                        {
                            reqStatusDropdown:
                                <ReqStatusDropdown
                                    jobId={URLParams.jobId}
                                    reqId={req.id}
                                    reqStatus={req.result_status} />
                        }
                    ],
                    modals: [
                        {
                            modalContainer:
                                <ReqDetailsModalContainer
                                    reqSalaryInterest={req.salary}
                                    reqDurationInterest={req.contract_interest}
                                    reqResumeLink={req.resume}
                                    reqTaskSolutionLink={req.task_solution}
                                />,
                        }
                    ],
                    linkers: [],
                    status: req.result_status
                }));
            setJobRequests(customJobReqsArr);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    toastService.showToast('احازه ی دسترسی ندارید.', 'danger');
                } else {
console.log(err.response)
                    toastService.showToast(err.response.statusText, 'danger');
                }
            } else {
                toastService.showToast(err.message, 'danger');
            }
        }
    }

    useEffect(() => {
        getJobRequests();
    }, []);


    function filterRequests(status, isChecked) {
        if (isChecked) {
            filteredStatuses.push(status);
        } else {
            filteredStatuses.splice(filteredStatuses.indexOf(status), 1);
        }

        if (filteredStatuses.length !== 0) {
            let filteredReqs = [];
            filteredStatuses.forEach(filteredStatus => {
                customJobReqsArr.forEach(req => {
                    if (req.status === filteredStatus) {
                        filteredReqs.push(req);
                    }
                });
            });
            setJobRequests(filteredReqs);
        } else {
            setJobRequests(customJobReqsArr);
        }
    }

    const columns = [
        { id: 0, name: "نام" },
        { id: 1, name: "تاریخ درخواست" },
        { id: 2, name: "وضعیت" },
        { id: 3, name: "جزییات" },
    ];

    return (
        <div className='container job-requests-sec'>
            <h3>درخواست ها </h3>

            <FilterRequests filterRequests={filterRequests} />

            <Table
                columns={columns}
                rows={jobRequests} >
            </Table>

        </div>
    );
}

export default JobRequestsTable;