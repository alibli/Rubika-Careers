import apiService from "./APIService";
import Subject from "./Subject";
import APIModel from "./APIModel";
class UserService {
    constructor() {
        const localStorageToken = window.localStorage.getItem('userToken');

        // this.loggedin = USERTOKEN ? true : false;
        this.loggedin = true;

        this.userToken = localStorageToken ? localStorageToken : '';

        // const localStorageFirstname = window.localStorage.getItem('userFirstname');
        // this.userFirstname = localStorageFirstname ? localStorageFirstname : '';
        this.userFirstname = 'ادمین';

        this.userSubject = new Subject();

        window.onstorage = () => {
            const refereshedLocalStorageToken = window.localStorage.getItem('userToken');
            this.setLoggedin(refereshedLocalStorageToken ? true : false);
            this.setUserToken(refereshedLocalStorageToken ? refereshedLocalStorageToken : '');

            const refereshedLocalStorageFirstname = window.localStorage.getItem('userFirstname');
            this.setUserFirstname(refereshedLocalStorageFirstname ? refereshedLocalStorageFirstname : '');

            this.userSubject.notify({ action: 'STORAGE-CHANGE' });
        }
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
            url: '/user/login',
            body: {
                loginInfo: {
                    email: email,
                    password: password
                }
            }
        });
        const loginResponse = apiService.apiCall(apiModel);
        return loginResponse;
    }

    signup({ firstname, lastname, email, password }) {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/register',
            body: {
                createUserInfo: {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    password: password
                }
            }
        });
        const response = apiService.apiCall(apiModel);
        return response;
    }

    logout = () => {
        const apiModel = new APIModel({
            method: 'post',
            url: '/user/logout',
        });
        const response = apiService.apiCall(apiModel);
        return response;
    };

    setUserInfo = (token, firstname) => {
        this.setUserToken(token);
        this.setUserFirstname(firstname);
    }

    getUserProfile() {
        const apiModel = new APIModel({
            method: 'get',
            url: '/user/profile',
        });
        const userProfile = apiService.apiCall(apiModel);
        return userProfile;
    }

    editUserResume(resumeFile) {
        const apiModel = new APIModel({
            method: 'patch',
            url: '/user/profile',
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
        const apiModel = new APIModel({ method: 'get', url: '/admin-panel' });
        const adminJobsList = apiService.apiCall(apiModel);
        return adminJobsList;
    }

    //private
    setUserToken = (token) => {
        this.userToken = token;
        if (token === '') {
            window.localStorage.removeItem('userToken');
            this.setLoggedin(false);
        } else {
            window.localStorage.setItem('userToken', token);
            this.setLoggedin(true);
        }
    };

    setUserFirstname = (firstname) => {
        this.userFirstname = firstname;
        firstname === ''
            ? window.localStorage.removeItem('userFirstname')
            : window.localStorage.setItem('userFirstname', firstname);
    };

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


    //ali
    //userRegister
    // setUserSignup = (firstName, lastName, email, password) => {
    //     const response = apiService.postRequest('/user/register',
    //         {
    //             first_name: firstName,
    //             last_name: lastName,
    //             email: email,
    //             password: password
    //         },
    //         // {
    //         //     //null header
    //         // }
    //     );

    //     return response;
    // }

    // setUserSignup2 = (apiModel) => {
    //     const response = apiService.apiCall(apiModel);
    //     return response;
    // }

    //loginPage


    //13dey
    //logoutPage
    // setUserLogout() {
    //     return apiService.getRequest('logout');
    // }


    //userProfile



    // setUserDelete(token) {
    //     return apiService.deleteRequest('/user/profile'
    //         // {headers: {token}}
    //     );
    // }

    // setUserResumeEdit(token, resumeName) {
    //     return apiService.patchRequest('/user/profile',
    //         {
    //             params: {
    //                 resume: resumeName
    //             }
    //         }
    //         // {headers: {token}}
    //     );
    // }


    // setAdminChangeAppStatus(jobId, id, token, newStatus) {
    //     return apiService.patchRequest('/admin-panel/' + jobId + '/applications/' + id + '/edit-status',
    //         {
    //             params: {
    //                 applicationStatus: newStatus
    //             }
    //         }
    //         // {headers: {token}}
    //     );
    // }


    // setUserAppOneFieldEdit(id, token, resume, taskSolution, salary, contractInterest) {
    //     return apiService.patchRequest('/user/profile/applications/' + id + '/edit',
    //         {
    //             params: {
    //                 resume: resume,
    //                 task_solution: taskSolution,
    //                 salary: salary,
    //                 contract_interest: contractInterest
    //             }
    //         }
    //         // {headers: {token}}
    //     );
    // }


    // getAdminJobsApplicationsList(token, jobId) {
    //     return apiService.getRequest('/admin-panel' + jobId + '/applications'
    //         // { headers: token }
    //         // { params: {/*null*/ } })
    //     )
    // }



}

const userService = new UserService();

export default userService;