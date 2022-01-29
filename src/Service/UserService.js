import apiService from "./APIService";
import Subject from "./Subject";
import APIModel from "./APIModel";
class UserService {
    constructor() {
        const localStorageToken = window.localStorage.getItem('userToken');

        this.loggedin = localStorageToken ? true : false;
        // this.loggedin = true;

        this.userToken = localStorageToken ? localStorageToken : '';

        const localStorageFirstname = window.localStorage.getItem('userFirstname');
        this.userFirstname = localStorageFirstname ? localStorageFirstname : '';
        // this.userFirstname = 'علی';

        this.userSubject = new Subject();

        // window.onstorage = () => {
        //     const refereshedLocalStorageToken = window.localStorage.getItem('userToken');
        //     this.setLoggedin(refereshedLocalStorageToken ? true : false);
        //     this.setUserToken(refereshedLocalStorageToken ? refereshedLocalStorageToken : '');

        //     const refereshedLocalStorageFirstname = window.localStorage.getItem('userFirstname');
        //     this.setUserFirstname(refereshedLocalStorageFirstname ? refereshedLocalStorageFirstname : '');

        //     this.userSubject.notify({ action: 'STORAGE-CHANGE' });
        // }
    }

    //public
    getLoggedin = () => {
        return this.loggedin;
    };

    getUserFirstname = () => {
        if (this.loggedin) {
            return this.userFirstname;
        }
        console.log('User is not logged in. (getUserFirstname from UserService)');
        return;
    };

    login({ email, password }) {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/login/',
            body: {
                email: email,
                password: password
            },
        });
        const loginResponse = apiService.apiCall(apiModel);
        return loginResponse;
    }

    signup({ firstname, lastname, email, password }) {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/register/',
            body: {
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password
            }
        });
        const response = apiService.apiCall(apiModel);
        return response;
    }

    logout = () => {
        const apiModel = new APIModel({
            method: 'get',
            url: '/user/logout/',
        });
        const response = apiService.apiCall(apiModel);
        return response;
    };

    setUserInfo = (token, firstname) => {
        this.setUserToken(token);
        this.setUserFirstname(firstname);
        this.setLoggedin(true);
    }

    getUserProfile() {
        const apiModel = new APIModel({
            method: 'get',
            url: '/user/profile/',
        });
        const userProfile = apiService.apiCall(apiModel);
        return userProfile;
    }

    editUserResume(resumeFile) {
        const apiModel = new APIModel({
            method: 'patch',
            url: '/user/profile/',
            body: {
                resume: {
                    bytecode: resumeFile.bytecode,
                    format: resumeFile.format
                }
            }
        });

        const userNewResume = apiService.apiCall(apiModel);
        return userNewResume;
    }

    getAdminJobsList() {
        const apiModel = new APIModel({ method: 'get', url: '/admin-panel/' });
        const adminJobsList = apiService.apiCall(apiModel);
        return adminJobsList;
    }

    //private
    setUserToken = (token) => {
        this.userToken = token;

        window.localStorage.setItem('userToken', token);
    };

    setUserFirstname = (firstname) => {
        this.userFirstname = firstname;

        window.localStorage.setItem('userFirstname', firstname);
    };

    clearUserInfo = () => {
        window.localStorage.clear();
        this.userToken = '';
        this.userFirstname = '';
        this.setLoggedin(false);
    }

    setLoggedin = (value) => {
        if (typeof (value) === 'boolean') {
            this.loggedin = value;
            if (value) {
                this.userSubject.notify({ action: 'USER-LOGIN' });
            } else {
                this.userSubject.notify({ action: 'USER-LOGOUT' });
            }
        }
    };
}

const userService = new UserService();

export default userService;