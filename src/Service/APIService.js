import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://0.0.0.0:8000/v1'
});

class APIService {

    constructor() {
        axiosInstance.interceptors.request.use(x => {
            x.headers['token'] = localStorage.getItem('token');
        })

        axiosInstance.interceptors.response.use(x => {
            x.headers['token'] = localStorage.getItem('token');
        })
    }
    //public
    async getRequest(url) {
        try {
            const res = await axiosInstance.get(url);
            return res.json();
        }
        catch (err) {
            throw err;
        }
    }

    async postRequest(url, body, header) {
        try {
            const res = await axiosInstance.post(url, body, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }




    applyForJob(){
        
    }


}

const apiService = new APIService();
export default apiService;