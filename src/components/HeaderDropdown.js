import { useState, useEffect } from 'react';
import userService from '../Service/UserService';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/HeaderDropdown.css';
import toastService from '../Service/ToastService';
import { useNavigate } from 'react-router-dom';

function HeaderDropdown() {
    const navigate = useNavigate();

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

    const logout = async () => {
        try {
            const logoutRes = await userService.logout();
            const { status } = logoutRes;
            if (status === 200) {
                userService.clearUserInfo();
                navigate('/');
                toastService.showToast('با موفقیت خارج شدید.', 'success');
            }
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    return (
        <>
            {
                userFirstname === 'ادمین'
                    ?
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="warning"
                            id="dropdown-basic">
                            سلام ادمین
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="header-dropdown">
                            <LinkContainer to='/admin-panel'>
                                <Dropdown.Item>
                
                                    موقعیت های شغلی
                                </Dropdown.Item>
                            </LinkContainer>
                            <Dropdown.Item
                                onClick={logout}>
                                خروج
                            </Dropdown.Item>
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
                            <LinkContainer to='/user-info'>
                                <Dropdown.Item>
                                    مشخصات
                                </Dropdown.Item>

                            </LinkContainer>
                            <LinkContainer to="/user-panel">
                                <Dropdown.Item>
                                    درخواست‌ها
                                </Dropdown.Item>
                            </LinkContainer>
                            <Dropdown.Item
                                onClick={logout}>
                                خروج
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            }
        </>
    );
}

export default HeaderDropdown;