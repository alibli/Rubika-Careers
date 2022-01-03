import apiService from "./APIService";

class ApplicationService{
    constructor(){

    }

    //applicationUserInfo
    getUserApplicationInfo(token){
        return apiService.getRequest('/apply',
        {headers:{token}},
        {params:{}} 
        );
    }

    //apply
    setUserApply(token , jobId , resume , taskSolution , salary , contractInterest){
        return apiService.postRequest('/apply',
        {
            job_id: jobId,
            resume: resume,
            task_solution: taskSolution,
            salary: salary,
            contract_interest: contractInterest
        });
    }

    

}

const applicationService = new ApplicationService();

export default applicationService;