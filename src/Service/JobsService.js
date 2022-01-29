import apiService from "./APIService";
import APIModel from './APIModel';

class JobsService {
    
    //public
    getJobsList(){
        const apiModel = new APIModel({method: 'get', url: '/'});
        const jobsList = apiService.apiCall(apiModel);
        return jobsList;
    }

    getJobDetails(jobId) {
        const apiModel = new APIModel({method: 'get', url: '/jobs/' + jobId + '/'});
        const jobDetails = apiService.apiCall(apiModel);
        return jobDetails;
    }

    editJobPosition(jobId, { jobTitle, jobDescription, jobTaskFile, deactiveJob, deletedJob}) {
        const apiModel = new APIModel({
            method: 'put', 
            url: '/jobs/' + jobId + '/edit/',
            body: {
                title: jobTitle,
                description: jobDescription,
                task: {
                    mime: jobTaskFile.format,
                    data: jobTaskFile.bytecode
                },
                is_deactive: deactiveJob,
                is_deleted: deletedJob
            }
        });
        const editedJob = apiService.apiCall(apiModel);
        return editedJob;
    }

    addJobPosition({ jobTitle, jobDescription, jobTaskFile, deactiveJob }) {
        const apiModel = new APIModel({
            method: 'put', 
            url: 'jobs/add/',
            body: {
                title: jobTitle,
                description: jobDescription,
                task: {
                    mime: jobTaskFile.format,
                    data: jobTaskFile.bytecode
                },
                is_deactive: deactiveJob
            }
        });
        const addedJob = apiService.apiCall(apiModel);
        return addedJob;
    }

    getJobRequests(jobId) {
        const apiModel = new APIModel({method: 'get', url: '/admin-panel/' + jobId + '/applications/'});
        const jobDetails = apiService.apiCall(apiModel);
        return jobDetails;
    }

    setApplicationStatus(jobId, reqId, newStatus) {
        const apiModel = new APIModel({
            method: 'patch', 
            url: '/admin-panel/' + jobId + '/applications/' + reqId + '/edit-status/',
            body: {
                resultStatus: {
                    result_status: newStatus
                }
            }
        });
        const editedStatus = apiService.apiCall(apiModel);
        return editedStatus;
    }
}

const jobsService = new JobsService();

export default jobsService; 