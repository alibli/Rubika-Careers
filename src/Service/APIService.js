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
    async getRequest(url , header , params) {
        try {
            const res = await axiosInstance.get(url , header , params);
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

//13 dey
    async putRequest(url, body, header){
        try {
            const res = await axiosInstance.put(url, body, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async patchRequest(url, body, header){
        try {
            const res = await axiosInstance.patch(url, body, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async deleteRequest(url , header){
        try {
            const res = await axiosInstance.put(url , header);
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