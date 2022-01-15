import apiService from "./APIService";
import APIModel from './APIModel';

class JobsService {

    getJobsList(){
        const apiModel = new APIModel({method: 'get', url: '/jobs'});
        const jobsList = apiService.apiCall(apiModel);
        return jobsList;
    }

    getJobDetails(jobId) {
        const apiModel = new APIModel({method: 'get', url: '/jobs/' + jobId});
        const jobDetails = apiService.apiCall(apiModel);
        return jobDetails;
    }

    editJobPosition(jobId, { jobTitle, jobDescription, jobTaskFile, deactiveJob, deletedJob}) {
        const apiModel = new APIModel({
            method: 'put', 
            url: '/jobs/' + jobId + '/edit',
            body: {
                title: jobTitle,
                description: jobDescription,
                task: {
                    bytecode: jobTaskFile.bytecode,
                    format: jobTaskFile.format
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
            url: 'jobs/add',
            body: {
                title: jobTitle,
                description: jobDescription,
                task: {
                    bytecode: jobTaskFile.bytecode,
                    format: jobTaskFile.format
                },
                is_deactive: deactiveJob
            }
        });
        const addedJob = apiService.apiCall(apiModel);
        return addedJob;
    }
}

const jobsService = new JobsService();

export default jobsService;