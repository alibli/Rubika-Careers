import apiService from "./APIService";
import toastService from "./ToastService";

class JobsService {

    //public
    // incorrect:
    async getJobsList() {
        try {
            console.log('try');
            const jobs = await apiService.getRequest('/jobs');
            console.log(jobs);
            if (jobs.data.length === 0) {
                toastService.showToast('در حال حاضر موقعیت شغلی فعالی وجود ندارد', 'warning');
            }
            return jobs.data;
        }
        catch (err) {
            console.log('some err');
            toastService.showToast('Some Server Error', 'danger');
            // throw err;
        }

    }
    // correct:
    getJobsList2(){
        const jobs = apiService.getRequest('/jobs');
        return jobs;
        //this is just a bridge between apiService to jobsList!
    }

    getJobDetails(id) {
        const result = apiService.getRequest('/jobs/' + id);
        result.then((res) => {
            if (res.status === 200) {
                return res;
            }
            else if (res.status === 404) {
                toastService.showToast('موقعیت شغلی مورد نظر یافت نشد', 'warning');
            }
        },
            (err) => {
                toastService.showToast('Some Server Error', 'danger');
            });
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