import { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/images/rubikaLogo.png';
import HeaderDropdown from './HeaderDropdown';
import userService from '../Service/UserService';
import LoginSignupModal from './LoginSignupModal';
import { Link } from 'react-router-dom';

function Header() {

    const [loggedin, setLoggedin] = useState(userService.getLoggedin());

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGGIN':
                setLoggedin(userService.getLoggedin());
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return userService.userSubject.unsubscribe(userObserver);

    }, [])

    return (
        <nav dir='rtl' className="navbar navbar-expand-lg static-top">
            <div className="container">

                <Link to="/">
                    <img src={logo} alt="Rubika" height="36" />
                </Link>

                {
                    loggedin
                        ? <HeaderDropdown />
                        : <LoginSignupModal buttonLabel="ورود / ثبت‌نام" />
                }
            </div>

        </nav>
    )
}

export default Header;
