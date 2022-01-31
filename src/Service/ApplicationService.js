import apiService from "./APIService";
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

    editJobApplication({ resumeFile, taskAnswerFile, salaryInterestValue, durationInterestValue }, applicaionId) {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/profile/applications/' + applicaionId + '/edit/',

            body: {
                editInfo: {
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
            }
        });
        console.log(apiModel.body);
        // debugger

        const jobApply = apiService.apiCall(apiModel);
        return jobApply;
    }
}

const applicationService = new ApplicationService();
export default applicationService;