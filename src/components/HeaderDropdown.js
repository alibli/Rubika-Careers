import { useState, useEffect } from 'react';
import userService from '../Service/UserService';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/HeaderDropdown.css';
import toastService from '../Service/ToastService';

function HeaderDropdown() {

    const userFirstnameValue = userService.getUserFirstname();
    const [userFirstname, setUserFirstname] = useState(userFirstnameValue);

    const userObserver = (e) => {
        switch (e.action) {
            case 'USER-LOGIN':
            case 'STORAGE-CHANGE':
                const userFirstnameValue = userService.getUserFirstname();
                setUserFirstname(userFirstnameValue);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        userService.userSubject.subscribe(userObserver);

        return () => {
            userService.userSubject.unsubscribe(userObserver);
        };

    }, []);

    function onLogout() {
        const response = userService.logout();
        response
            .then(() => {
                userService.setUserInfo('', '');
                toastService.showToast('با موفقیت خارج شدید.', 'success');
            }).catch((err) => {
                toastService.showToast(err.message, 'danger');
            })
    }

    return (
        <> {
            userFirstname === 'ادمین'
                ?
                <Dropdown>
                    <Dropdown.Toggle
                        variant="warning"
                        id="dropdown-basic">
                        سلام ادمین
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="header-dropdown">
                        <LinkContainer to='/job-positions'>
                            <Dropdown.Item>
                                موقعیت های شغلی
                            </Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/">
                            <Dropdown.Item
                                onClick={onLogout}>
                                خروج
                            </Dropdown.Item>
                        </LinkContainer>
                    </Dropdown.Menu>
                </Dropdown>

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
                                onClick={onLogout}>
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