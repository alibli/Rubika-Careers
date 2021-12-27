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
    };

    getUserToken = () => {
        if (this.loggedin) {
            return this.userToken;
        } else if (!this.loggedin) {
            console.log("User haven't loggedin (from getUserToken in UserService)");
            return;
        }
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
}

const userService = new UserService();

export default userService;