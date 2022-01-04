import axios from "axios";
import apiModel from "../components/Core/ApiModel";
const axiosInstance = axios.create({
    baseURL: 'https://0.0.0.0:8000/v1'
});

class APIService {

    constructor() {
        axiosInstance.interceptors.request.use(x => {
            x.headers['token'] = localStorage.getItem('token');
        });

        axiosInstance.interceptors.response.use(x => {
        })
    }

    async apiCall(apiModel) {
        switch (apiModel.method) {
            case 'post':
                return this.postRequest(apiModel);
            case 'patch':
                return this.patchRequest(apiModel);
            case 'delete':
                return this.deleteRequest(apiModel);
            case 'put':
                return this.putRequest(apiModel);
            case 'get':
            default:
                return this.getRequest(apiModel);
        }
    }

    //public
    async getRequest(url, params , header) {
        try {
            const res = await axiosInstance.get(url, params, header);
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
    async putRequest(url, body, header) {
        try {
            const res = await axiosInstance.put(url, body, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async patchRequest(url, body, header) {
        try {
            const res = await axiosInstance.patch(url, body, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async deleteRequest(url, header) {
        try {
            const res = await axiosInstance.put(url, header);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    configHeader(headers) {
        const token = localStorage.getItem('token');
        if (token) {
            headers.token = token;
        }
        // return res;
    }

}

const apiService = new APIService();
export default apiService;