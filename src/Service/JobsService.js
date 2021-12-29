import apiService from "./APIService";
import toastService from "./ToastService";

class JobsService {

    //public
    getJobsList() {
        const result = apiService.getRequest('/jobs');
        result.then((res) => {
            if (res.data.length === 0) {
                toastService.showToast('در حال حاضر موقعیت شغلی فعالی وجود ندارد', 'warning')
            }
            else {
                return res;
            }
        },
            (err) => {
                toastService.showToast('Some Server Error', 'danger');
            });
    }

}

const jobsService = new JobsService();

export default jobsService;