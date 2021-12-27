import axios from "axios";
import jobsService from "./JobsService";

class APIService {
    //public
    getRequest(url, handleResponse, handleError) {
        axios.get(url)
        .then(rsp => rsp.json())
        .then(data => handleResponse(data))
        .catch(err => handleError(err));
    }

    postRequest(url, body) {
        return axios.post(url, body);
    }

    putRequest(url, body) {
        return axios.put(url, body);
    }

    patchRequest(url, body) {
        return axios.patch(url, body);
    }

    deleteRequest(url, body) {
        return axios.delete(url, body);
    }

    handleJobsList = (data) => {
        if (data.length !== 0) {
            jobsService.setJobsList(data);
        }
    }

    handleError = (err) => {
        console.log(err);
    }


}

const apiService = new APIService();
export default apiService;