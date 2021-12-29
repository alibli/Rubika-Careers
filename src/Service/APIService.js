import axios from "axios";
import jobsService from "./JobsService";
import Notification from "../components/Core/Notification";

axios.create({baseURL: 'https://0.0.0.0:8000/v1'});

class APIService {

    //public
    async getRequest(url) {
        try {
            const res = await axios.get(url);
            return res.json();
        }
        catch (err) {
            throw err;
        }
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
        <Notification message={err.message} alertModel={"danger"}></Notification>
        console.log(err.message);
    }


}

const apiService = new APIService();
export default apiService;