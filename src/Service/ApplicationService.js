import apiService from "./APIService";
import APIModel from "./APIModel";

class ApplicationService {

    //public
    applyForJob({ resumeFile, taskAnswerFile, salaryInterestValue, durationInterestValue  }, jobId) {

        const apiModel = new APIModel({
            method: 'post',
            url: '/apply',
            body: {
                applyInfo: {
                    job_id: jobId,
                    resume: resumeFile,
                    task_solution: taskAnswerFile,
                    salary: salaryInterestValue,
                    contract_interest: durationInterestValue
                }
            }
        });

        const editedApply = apiService.apiCall(apiModel);
        return editedApply;
    }

    editJobApplication({ resumeFile, taskAnswerFile, salaryInterestValue, durationInterestValue }, applicaionId) {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/profile/applications/'+ applicaionId + '/edit',
            body: {
                editInfo: {
                    resume: resumeFile,
                    task_solution: taskAnswerFile,
                    salary: salaryInterestValue,
                    contract_interest: durationInterestValue
                }
            }
        });

        const jobApply = apiService.apiCall(apiModel);
        return jobApply;
    }
}

const applicationService = new ApplicationService();
export default applicationService;