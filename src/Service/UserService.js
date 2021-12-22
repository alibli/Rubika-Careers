import Subject  from "./Subject";

class UserService {
    constructor() {
        this.Loggedin = false;

        this.user = {
            firstname: 'علی'
        };

        this.userSubject = new Subject();
    }

    //public
    getLoggedin = () => {
       return this.Loggedin;
    }

    getUserFirstname = () => {
        if (this.user.length === 0) {
            return '';
        } else if (!this.user.hasOwnProperty('firstname')) {
            return 'admin';
        }

        return this.user.firstname;
    }

    setLoggedinTrue = () => {
        this.Loggedin = true;

        this.userSubject.notify({action: 'USER-LOGGIN'})
    }
}

const userService = new UserService();

export default userService;