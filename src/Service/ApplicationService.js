import apiService from "./APIService";
import APIModel from "./APIModel";

class ApplicationService {

    //public
    applyForJob({ job_id, newResume, new_task_Solution, salary, contract_interest }) {

        const apiModel = new APIModel({
            method: 'post',
            url: '/apply',
            body: {
                applyInfo: {
                    job_id: job_id,
                    resume: newResume,
                    task_solution: new_task_Solution,
                    salary: salary,
                    contract_interest: contract_interest
                }
            }
        });

        const editedApply = apiService.apiCall(apiModel);
        return editedApply;
    }

    editApply(editInfo, id) {
        const { 
            resume, 
            task_Solution, 
            salary, 
            contract_interest 
        } = editInfo;

        const apiModel = new APIModel({
            method: 'post',
            url: '/user/profile/applications/'+ id + '/edit',
            body: {
                editInfo: {
                    resume: resume,
                    task_solution: task_Solution,
                    salary: salary,
                    contract_interest: contract_interest
                }
            }
        });

        const userApply = apiService.apiCall(apiModel);
        return userApply;
    }

    //applicationUserInfo
    getUserApplicationInfo(token) {
        return apiService.getRequest('/apply',
            { headers: { token } },
            { params: {} }
        );
    }


}

const applicationService = new ApplicationService();
export default applicationService;