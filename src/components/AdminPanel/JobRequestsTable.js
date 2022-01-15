import '../../styles/JobRequestsTable.css';
import Table from '../Core/Table';
import FilterRequests from './FilterRequests';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReqStatusDropdown from './ReqStatusDropdown';
import jobsService from '../../Service/JobsService';
import toastService from '../../Service/ToastService';
import ReqDetailsModalContainer from './ReqDetailsModalContainer';

function JobRequestsTable() {
    const customJobReqsArr = [
        {
            id: 10,
            fields: [
                {
                    reqName: 'علی علوی'
                },
                {
                    reqDate: '۱۴۰۰/۰۳/۰۱'
                },
                {
                    reqStatusDropdown:
                        <ReqStatusDropdown
                            jobId={0}
                            reqId={10}
                            reqStatus='unknown' />
                }
            ],
            modals: [
                {
                    modalContainer:
                        <ReqDetailsModalContainer
                            reqSalaryInterest={6000000}
                            reqDurationInterest={12}
                            reqResumeLink={''}
                            reqTaskSolutionLink={''}
                        />,
                }
            ],
            linkers: [],
            status: 'unknown'
        },
        {
            id: 11,
            fields: [
                {
                    reqName: 'فاطمه فاطمی'
                },
                {
                    reqDate: '۱۴۰۰/۰۷/۰۱'
                },
                {
                    reqStatusDropdown:
                        <ReqStatusDropdown
                            jobId={0}
                            reqId={11}
                            reqStatus='accept' />
                }
            ],
            modals: [
                {
                    modalContainer:
                        <ReqDetailsModalContainer
                            reqSalaryInterest={5000000}
                            reqDurationInterest={18}
                            reqResumeLink={''}
                            reqTaskSolutionLink={''}
                        />,
                }
            ],
            linkers: [],
            status: 'accept'
        }
    ];


    const URLParams = useParams();

    const [jobRequests, setJobRequests] = useState(customJobReqsArr);

    //var customJobReqsArr=[];
    // async function getJobRequests() {
    //     try {
    //         const jobReqsRes = await jobsService.getJobRequests(URLParams.jobId);
    //         const { data } = jobReqsRes.data;
    //         data.forEach(req =>
    //             customJobReqsArr.push({
    //                 id: req.id,
    //                 fields: [
    //                     {
    //                         reqName: req.name
    //                     },
    //                     {
    //                         reqDate: req.created_at
    //                     },
    //                     {
    //                         reqStatusDropdown:
    //                             <ReqStatusDropdown
    //                                 jobId={URLParams.jobId}
    //                                 reqId={req.id}
    //                                 reqStatus={req.result_status} />
    //                     }
    //                 ],
    //                 modals: [
    //                     {
    //                         modalContainer:
    //                             <ReqDetailsModalContainer
    //                                 reqSalaryInterest={req.salary}
    //                                 reqDurationInterest={req.contract_interest}
    //                                 reqResumeLink={req.resume}
    //                                 reqTaskSolutionLink={req.task_solution}
    //                             />,
    //                     }
    //                 ],
    //                 linkers: [],
    // status: req.result_status
    //             }));
    //         setJobRequests(customJobReqsArr);
    //     } catch (err) {
    //         if (err.response) {
    //             if (err.response.status === 403) {
    //                 toastService.showToast('احازه ی دسترسی ندارید.', 'danger');
    //             }
    //         } else {
    //             toastService.showToast(err.message, 'danger');
    //         }
    //     }
    // }

    // useEffect(() => {
    //     getJobRequests();
    // }, []);


    //work on this
    var filteredStatuses = [];
    function filterRequests(status, isChecked) {
        if (isChecked) {
            filteredStatuses.push(status);
        } else {
            filteredStatuses.splice(filteredStatuses.indexOf(status), 1);
        }

        if(filteredStatuses.length !== 0) {
            let filteredReqs = [];
            filteredStatuses.forEach(filteredStatus => {
                customJobReqsArr.forEach(req => {
                    if(req.status === filteredStatus) {
                        filteredReqs.push(req);
                    }
                });
            });
            setJobRequests(filteredReqs);
            debugger
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

        <div className='row col col-lg-11 col-12 offset-1 job-requests-table' >

            <div dir='rtl' className='col col-lg-9 col-12'>
                <h3>درخواست ها </h3>
                <Table
                    columns={columns}
                    rows={jobRequests} >
                </Table>
            </div>

            <div dir='rtl' className='col col-lg-2 offset-lg-1 col-6 offset-6 '>
                <FilterRequests filterRequests={filterRequests} />
            </div>

        </div>


    );
}

export default JobRequestsTable;