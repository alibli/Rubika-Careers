import { apiService } from "./APIService";
import APIModel from './APIModel';

class JobsService {

    //public
    getJobsList() {
        const apiModel = new APIModel({ method: 'get', url: '/' });
        const jobsList = apiService.apiCall(apiModel);
        return jobsList;
    }

    getJobDetails(jobId) {
        const apiModel = new APIModel({ method: 'get', url: '/jobs/' + jobId + '/' });
        const jobDetails = apiService.apiCall(apiModel);
        return jobDetails;
    }

    editJobPosition(jobId, editedInfo) {
        const apiModel = new APIModel({
            method: 'put',
            url: '/jobs/' + jobId + '/edit/',
            body: {
                ...editedInfo
            }
        });
        const editedJob = apiService.apiCall(apiModel);
        return editedJob;
    }

    addJobPosition({ jobTitle, jobDescription, jobTaskFile, deactiveJob }) {
        var body = {};
        if (jobTaskFile) {
            body = {
                title: jobTitle,
                description: jobDescription,
                task: {
                    mime: jobTaskFile.format,
                    data: jobTaskFile.bytecode
                },
                is_deactive: deactiveJob
            }
        } else {
            body = {
                title: jobTitle,
                description: jobDescription,
                is_deactive: deactiveJob
            }
        }
        const apiModel = new APIModel({
            method: 'post',
            url: 'jobs/add/',
            body: body
        });
        const addedJob = apiService.apiCall(apiModel);
        return addedJob;
    }


    getJobRequests(jobId) {
        const apiModel = new APIModel({ method: 'get', url: 'user/admin-panel/' + jobId + '/applications/' });
        const jobDetails = apiService.apiCall(apiModel);

        return jobDetails;
    }

    setApplicationStatus(jobId, reqId, newStatus) {
        const apiModel = new APIModel({
            method: 'patch',
            url: 'user/admin-panel/' + jobId + '/applications/' + reqId + '/edit-status/', /* 'user' added to url 11bahmn */
            body: {
                result_status: newStatus
            }
        });
        const editedStatus = apiService.apiCall(apiModel);
        return editedStatus;
    }
}

const jobsService = new JobsService();

export default jobsService; 