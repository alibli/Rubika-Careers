import React from 'react';
import '../styles/Header.css';
import logo from '../assets/images/rubikaLogo.png';
import Dropdown from './Dropdown';

function Header() {

    const userMuck = { name: 'علی', isLoggedIn: false };
    const isLoggedIn = userMuck.isLoggedIn;
    const regLoginBtn = <a className="btn" id='regLogin' href="#">ورود/ثبت نام</a>;

    const userDropdown = (
        <li className="nav-item dropdown btn" id="userDropdown">
            <a className="dropdown-toggle btn " type="button" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            سلام {userMuck.name}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">اطلاعات</a></li>
                    <hr className="dropdown-divider" />
                <li><a className="dropdown-item" href="#">درخواست ها</a></li>
            </ul>
        </li>
    )

    const dd = <Dropdown userName={userMuck.name} ></Dropdown>  //will be used after adding react router 

    return (
        <nav dir='rtl' className="navbar navbar-expand-lg static-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt={"Rubika"} height="36" />
                </a>
                {isLoggedIn ? userDropdown : regLoginBtn}
            </div>

        </nav>
    )
}

export default Header;
