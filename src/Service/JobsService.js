import apiService from "./APIService";

class JobsService {

    //public
    getJobsList() {
        const result = apiService.getRequest('https://0.0.0.0:8000/v1/jobs');
        result.then((res) => {
            return {
                status: res.status,
                body: res.body
            };
        },
            (err) => {
                return err;
            });
    }
}

const jobsService = new JobsService();

export default jobsService;