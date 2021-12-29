import apiService from "./APIService";
import toastService from "./ToastService";

class JobsService {

    //public
    async getJobsList() {
        // debugger
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
}

const jobsService = new JobsService();

export default jobsService;