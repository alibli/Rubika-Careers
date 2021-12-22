import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../Service/UserService';
import { Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function HeaderDropdown() {
    const [userFirstname, setUserFirstname] = useState(userService.getUserFirstname);

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGGIN':
                setUserFirstname(userService.getUserFirstname);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return userService.userSubject.unsubscribe(userObserver);

    }, []);

    return (
        <> {
            userFirstname === 'admin'
                ?
                <>
                    <Link to='/job-details'>
                        <Button variant="primary">
                           سلام ادمین
                        </Button>
                    </Link>
                </>

                :
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {'سلام ' + userFirstname}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to='/job-details'>
                                مشخصات
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/job-details">
                                درخواست‌ها
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        }
        </>


    );


}

export default HeaderDropdown;