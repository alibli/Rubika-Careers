import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://0.0.0.0:8000/v1'
});

class APIService {

    constructor() {
        axiosInstance.interceptors.request.use(config => {
            let userToken = localStorage.getItem('userToken');
            if (userToken) {
                config.headers['TOKEN'] = userToken;
            }

            return config;
        });
    }

    //public
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

    //private
    async getRequest({url}) {
        try {
            const res = await axiosInstance.get(url);
            return res.json();
        }
        catch (err) {
            throw err;
        }
    }

    async postRequest({url, body}) {
        try {
            const res = await axiosInstance.post(url, body);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async putRequest({url, body}) {
        try {
            const res = await axiosInstance.put(url, body);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async patchRequest({url, body}) {
        try {
            const res = await axiosInstance.patch(url, body);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

    async deleteRequest({url}) {
        try {
            const res = await axiosInstance.put(url);
            return res.json();
        } catch (err) {
            throw err;
        }
    }

}

const apiService = new APIService();
export default apiService;