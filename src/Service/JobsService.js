import apiService from "./APIService";
import APIModel from './APIModel';

class JobsService {

    getJobsList(){
        const apiModel = new APIModel({method: 'get', url: '/jobs'});
        const jobsList = apiService.apiCall(apiModel);
        return jobsList;
    }

    getJobDetails(id) {
        const apiModel = new APIModel({method: 'get', url: '/jobs/' + id});
        const jobDetails = apiService.apiCall(apiModel);
        return jobDetails;
    }


    setAdminNewJob(token , title , description , task , isDeactive){
        return apiService.postRequest('/jobs/add' ,
        {
            title: title,
            description: description,
            task: task,
            is_deactive: isDeactive
        },
        {headers:
            {
                token: token
            }
        } );
    }

    //editJobInfo
    setAdminJobInfo(id , token , title , description , task , isDeactive , isDeleted){  
        return apiService.putRequest('/jobs/'+id+'/edit' , 
        {
            title: title,
            description: description,
            task: task,
            is_deactive: isDeactive,
            is_deleted: isDeleted,
        },
        {
            headers:{
                token : token
            }
        });
    }

    //editOneField
    setEditOneField(id , token , title , description , task , isDeactive , isDeleted){
        return apiService.patchRequest('/jobs/'+id+'/edit',
        {
            title: title,
            description: description,
            task: task,
            is_deactive: isDeactive,
            is_deleted: isDeleted,
        },
        {headers:{
            token : token
        }})
    }

    

}

const jobsService = new JobsService();

export default jobsService;