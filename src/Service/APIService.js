import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://0.0.0.0:8000/v1'
});

class APIService {

    //public
    async getRequest(url, params) {
        try {
            const res = await axiosInstance.get(url, { params: params });
            return res.json();
        }
        catch (err) {
            throw err;
        }
    }

}

const apiService = new APIService();
export default apiService;