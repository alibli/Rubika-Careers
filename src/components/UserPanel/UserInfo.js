import { useEffect, useState } from 'react';
import userService from '../../Service/UserService';
import toastService from '../../Service/ToastService';
import { Row, Button } from 'react-bootstrap';
import '../../styles/UserInfo.css';

function UserInfo() {

    // const [userInfo, setUserInfo] = useState({
    //     firstname: '',
    //     lastname: '',
    //     resumeLink: '',
    //     newResumeFile: {
    //         byteCode: '',
    //         format: '',
    //     }
    // });

    const [userInfo, setUserInfo] = useState({
        firstname: 'پریناز',
        lastname: 'ستایشگر',
        resumeLink: 'https://www.google.com/search?q=resume&oq=resume&aqs=chrome.0.69i59.2049j0j7&sourceid=chrome&ie=UTF-8',
        newResumeFile: {
            byteCode: '',
            format: '',
        }
    });

    const [editingInfo, setEditingInfo] = useState(false);

    async function getUserInfo() {
        try {
            const userProfileRes = await userService.getUserProfile();
            const { data } = userProfileRes;
            setUserInfo((prevState) => ({
                ...prevState,
                firstname: data.first_name,
                lastname: data.last_name,
                resumeLink: data.resume
            }));
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    // useEffect(() => {
    //     getUserInfo();
    // }, [])

    return (
        <div className="user-info">
            <Row>
                <label htmlFor='firstname'>
                    نام
                </label>
                <input
                    className='modal-input'
                    name='firstname'
                    type='text'
                    disabled='true'
                    value={userInfo.firstname}
                />
            </Row>

            <Row>
                <label htmlFor='lastname'>
                    نام خانوادگی
                </label>
                <input
                    className='modal-input'
                    name='lastname'
                    type='text'
                    disabled='true'
                    value={userInfo.lastname}
                />
            </Row>

            <Row>
                <label htmlFor='resume'>
                    رزومه
                </label>

                {
                    userInfo.resumeLink.length > 0 &&
                    <a href={userInfo.resumeLink}>
                        دانلود
                    </a>
                }

                {
                    editingInfo &&
                    <input
                        className='modal-input'
                        name='resume'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let resumeData = new FormData();
                            resumeData.append(file.name, file);
                            setUserInfo((prevState) => ({
                                ...prevState,
                                newResumeFile: {
                                    byteCode: resumeData,
                                    format: file.type
                                }
                            }));
                        }}
                    />
                }


            </Row>

            <Button
                onClick={() => {
                    if (!editingInfo) {
                        setEditingInfo(true);
                    } else {

                    }
                }}
                variant="warning">
                {
                    editingInfo
                        ? 'ثبت'
                        : 'بارگذاری رزومه'
                }
            </Button>

        </div>
    );
}

export default UserInfo;