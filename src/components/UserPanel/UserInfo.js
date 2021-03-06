import { useEffect, useState } from 'react';
import userService from '../../Service/UserService';
import toastService from '../../Service/ToastService';
import { Row, Button } from 'react-bootstrap';
import '../../styles/UserInfo.css';
import { baseURL } from '../../Service/APIService';

function UserInfo() {
    const userFirstname = userService.getUserFirstname();
    const [userInfo, setUserInfo] = useState({
        firstname: userFirstname,
        lastname: '',
        resumeLink: '',
        newResumeFile: {
            byteCode: '',
            format: '',
        }
    });

    // const [userInfo, setUserInfo] = useState({
    //     firstname: 'پریناز',
    //     lastname: 'ستایشگر',
    //     resumeLink: 'https://www.google.com/search?q=resume&oq=resume&aqs=chrome.0.69i59.2049j0j7&sourceid=chrome&ie=UTF-8',
    //     newResumeFile: {
    //         bytecode: '',
    //         format: '',
    //     }
    // });

    const [editingInfo, setEditingInfo] = useState(false);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const getResumeFileBase64 = async (resumeFile) => {
        try {
            const resumeFileBase64 = await getBase64(resumeFile);
            return resumeFileBase64;
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    const setNewResume = (async (e) => {
        try {
            let resumeFile = e.target.files[0];
            const resumeFileBase64 = await getResumeFileBase64(resumeFile);
            setUserInfo((prevState) => ({
                ...prevState,
                newResumeFile: {
                    bytecode: resumeFileBase64.substring(resumeFileBase64.lastIndexOf(",") + 1),
                    format: resumeFileBase64.substring(
                        resumeFileBase64.lastIndexOf(":") + 1,
                        resumeFileBase64.lastIndexOf(";")
                    )
                }
            }));

        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    })

    async function editResume(resumeFile) {
        try {
            const editResumeRes = await userService.editUserResume(resumeFile);
            const { status, data } = editResumeRes;
            if (status === 200) {
                setUserInfo((prevState) => ({
                    ...prevState,
                    resumeLink: data.resume
                }));
            }
            toastService.showToast('رزومه شما با موفقیت بارگذاری شد.', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    async function getUserInfo() {
        try {
            const userProfileRes = await userService.getUserProfile();
            const { data } = userProfileRes;
            setUserInfo((prevState) => ({
                ...prevState,
                lastname: data.last_name,
                resumeLink: data.resume
            }));
        } catch (err) {
            toastService.showToast(err.message, 'danger');
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

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
                    readOnly
                    value={userInfo.firstname || ''}
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
                    readOnly
                    value={userInfo.lastname || ''}
                />
            </Row>

            <Row>
                <label htmlFor='resume'>
                    رزومه
                </label>
                {
                    userInfo.resumeLink !== null &&
                    <a href={baseURL + userInfo.resumeLink}>
                        دانلود
                    </a>
                }

                {
                    editingInfo &&
                    <input
                        className='modal-input'
                        name='resume'
                        type='file'
                        onChange={(e) => setNewResume(e)}
                    />
                }
            </Row>

            <Button
                onClick={() => {
                    if (!editingInfo) {
                        setEditingInfo(true);
                    } else {
                        editResume(userInfo.newResumeFile);
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