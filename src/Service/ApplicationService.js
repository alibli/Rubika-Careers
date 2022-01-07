import apiService from "./APIService";
import APIModel from "./APIModel";

class ApplicationService {

    //public
    //applicationUserInfo
    getUserApplicationInfo(token) {
        return apiService.getRequest('/apply',
            { headers: { token } },
            { params: {} }
        );
    }

    //apply
    applyForJob({ job_id, resume, task_Solution, salary, contract_interest }) {

        const apiModel = new APIModel({
            method: 'post',
            url: '/apply',
            body: {
                applyInfo: {
                    job_id: job_id,
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



}

const applicationService = new ApplicationService();
export default applicationService;