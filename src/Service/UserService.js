import apiService from "./APIService";
import Subject from "./Subject";
class UserService {
    constructor() {
        const USERTOKEN = window.localStorage.getItem('userToken');

        this.loggedin = USERTOKEN ? true : false;

        this.userToken = USERTOKEN ? USERTOKEN : null;

        const USERFIRSTNAME = window.localStorage.getItem('userFirstname');
        this.userFirstname = USERFIRSTNAME ? USERFIRSTNAME : '';

        this.userSubject = new Subject();

        window.onstorage = () => {
            const USERTOKENREFRESH = window.localStorage.getItem('userToken');

            this.setLoggedin(USERTOKENREFRESH ? true : false);
            this.setUserToken(USERTOKENREFRESH);
            this.setUserFirstname(window.localStorage.getItem('userFirstname'));

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

    getUserToken = () => {
        if (this.loggedin) {
            return this.userToken;
        }
        console.log("User is not logged in (from getUserToken in UserService)");
        return;
    };

    login = (token, firstname) => {

        this.setUserToken(token);
        this.setUserFirstname(firstname);
        this.setLoggedin(true);
        this.userSubject.notify({ action: 'USER-LOGIN' });
    }

    logout = () => {
        this.userToken = null;
        this.setLoggedin(false);
        this.setUserFirstname('');
        window.localStorage.removeItem('userToken');
        window.localStorage.removeItem('userFirstname');
        this.userSubject.notify({ action: 'USER-LOGOUT' });
    };

    //private
    setUserToken = (token) => {
        this.userToken = token;
        window.localStorage.setItem('userToken', token);
    };

    setUserFirstname = (firstname) => {
        this.userFirstname = firstname;
        window.localStorage.setItem('userFirstname', firstname);
    };

    setLoggedin = (value) => {
        if (typeof (value) === 'boolean') {
            this.loggedin = value;
        }
    };


    //ali
    //userRegister
    setUserSignup = (firstName, lastName, email, password) => {
        const response = apiService.postRequest('/user/register',
            {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            },
            // {
            //     //null header
            // }
        );

        return response;
    }

    setUserSignup2 = (apiModel) => {
        const response = apiService.apiCall(apiModel);
        return response;
    }

    //loginPage
    setUserLogin = (email, password) => {
        const response = apiService.postRequest('/user/login',
            {
                email: email,
                password: password
            });
        return response;
        // response.then((res) =>{
        //     if (res.data.length) {
        //         this.setUserFirstname(res.data.first_name);
        //         this.setUserToken(res.data.token);
        //     }
        //     else{
        //         return;
        //     }
        // },
        // (err) =>{
        //     console.log('signUp error :' + err);
        // });
    }

    //13dey
    //logoutPage
    setUserLogout() {
        return apiService.getRequest('logout');
    }

    //userApplicationEdit
    setUserEditInfo(id, token, resume, taskSolution, salary, contractInterest) {
        return apiService.putRequest('/user/profile/applications/' + id + '/edit',
            {//body
                resume: resume,
                task_solution: taskSolution,
                salary: salary,
                contract_interest: contractInterest
            },
            // {
            //     headers: { token: token }
            // }
        );
    }

    //userProfile
    getUserProfile(token) {
        return apiService.getRequest('/user/profile',
            // { headers: { token } },
            // { params: {} }
        );
    }


    setUserDelete(token) {
        return apiService.deleteRequest('/user/profile'
            // {headers: {token}}
        );
    }

    setUserResumeEdit(token, resumeName) {
        return apiService.patchRequest('/user/profile',
            {
                params: {
                    resume: resumeName
                }
            }
            // {headers: {token}}
        );
    }


    setAdminChangeAppStatus(jobId, id, token, newStatus) {
        return apiService.patchRequest('/admin-panel/' + jobId + '/applications/' + id + '/edit-status',
            {
                params: {
                    applicationStatus: newStatus
                }
            }
            // {headers: {token}}
        );
    }


    setUserAppOneFieldEdit(id, token, resume, taskSolution, salary, contractInterest) {
        return apiService.patchRequest('/user/profile/applications/' + id + '/edit',
            {
                params: {
                    resume: resume,
                    task_solution: taskSolution,
                    salary: salary,
                    contract_interest: contractInterest
                }
            }
            // {headers: {token}}
        );
    }


    getAdminPanel(token) {
        return apiService.getRequest('/admin-panel'
            // { headers: token })
            // { params: { } })
        )
    }

    getAdminJobsApplicationsList(token, jobId) {
        return apiService.getRequest('/admin-panel' + jobId + '/applications'
            // { headers: token }
            // { params: {/*null*/ } })
        )
    }



}

const userService = new UserService();

export default userService;