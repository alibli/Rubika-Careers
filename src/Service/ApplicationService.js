import { apiService } from "./APIService";
import APIModel from "./APIModel";

class ApplicationService {

    //public
    applyForJob({ resumeFile, taskAnswerFile, salaryInterestValue, durationInterestValue }, jobId) {

        const apiModel = new APIModel({
            method: 'post',
            url: 'applications/apply/',
            body: {
                    job_id: jobId,
                    resume: {
                        mime: resumeFile.format,
                        data: resumeFile.bytecode
                    },
                    task_solution: {
                        mime: taskAnswerFile.format,
                        data: taskAnswerFile.bytecode
                    },
                    salary: salaryInterestValue,
                    contract_interest: durationInterestValue
                }
        });

        const editedApply = apiService.apiCall(apiModel);
        return editedApply;
    }

    editJobApplication(editedInfo, applicaionId) {
        const apiModel = new APIModel({
            method: 'put',
            url: '/user/profile/applications/' + applicaionId + '/edit/',

            body: {
                    ...editedInfo
            }
        });

        const jobApply = apiService.apiCall(apiModel);
        return jobApply;
    }
}

const applicationService = new ApplicationService();
export default applicationService;