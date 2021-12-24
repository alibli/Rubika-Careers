import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../Service/UserService';
import { Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function HeaderDropdown() {
    const [userFirstname, setUserFirstname] = useState(userService.getUserFirstname);

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
            case 'USER-LOGOUT':
            case 'STORAGE-CHANGE':
                setUserFirstname(userService.getUserFirstname());
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return () => {
            userService.userSubject.unsubscribe(userObserver)
        };

    }, []);

    return (
        <> {
            userFirstname === 'ادمین'
                ?
                <>
                    <Link to='/job-details'>
                        <Button variant="warning">
                            سلام ادمین
                        </Button>
                    </Link>
                </>

                :
                <Dropdown>
                    <Dropdown.Toggle
                        variant="warning"
                        id="dropdown-basic">
                        {'سلام ' + userFirstname}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="header-dropdown">
                        <LinkContainer to='/job-details'>
                            <Dropdown.Item>
                                مشخصات
                            </Dropdown.Item>

                        </LinkContainer>
                        <LinkContainer to="/job-details">
                            <Dropdown.Item>
                                درخواست‌ها
                            </Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Dropdown.Item
                                onClick={() => userService.logout()}>
                                خروج
                            </Dropdown.Item>
                        </LinkContainer>
                    </Dropdown.Menu>
                </Dropdown>
        }
        </>


    );


}

export default HeaderDropdown;