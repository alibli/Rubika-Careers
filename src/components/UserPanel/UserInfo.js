import { useEffect, useState } from 'react';
import userService from '../../Service/UserService';
import toastService from '../../Service/ToastService';
import { Row, Button } from 'react-bootstrap';
import '../../styles/UserInfo.css';

function UserInfo() {
    const userInfoValue = {
        firstname: '‍پریناز',
        lastname: 'ستایشگر',
        resume: 'https://www.google.com/search?q=resume&oq=resume&aqs=chrome..69i57.1182j0j7&sourceid=chrome&ie=UTF-8',
        newResume: {
            byteCode: '',
            format: '',
        }
    }

    const [userInfo, setUserInfo] = useState(userInfoValue);
    const [editing, setEditing] = useState(false);

    // const [userInfo, setUserInfo] = useState({
    //     firstname: '',
    //     lastname: '',
    //     resume: '',
    //     newResume: {
    //         byteCode: '',
    //         format: '',
    //     }
    // });



    // useEffect(() => {
    //     const response = userService.getUserProfile();
    //     response
    //         .then(({ data }) => {
    //             setUserInfo({
    //                 firstname: data.first_name,
    //                 lastname: data.last_name,
    //                 resume: data.resume,
    //                 newResume: {
    //                     byteCode: '',
    //                     format: '',
    //                 }
    //             })
    //         })
    //         .catch((err) => {
    //             toastService.showToast(err.message, 'danger');
    //         });
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
                    disabled={true}
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
                    disabled={true}
                    value={userInfo.lastname}
                />
            </Row>

            <Row>
                <label htmlFor='resume'>
                    رزومه
                </label>

                {
                    userInfo.resume.length > 0 &&
                    <a href={userInfo.resume}>
                        دانلود
                    </a>
                }

                {
                    editing &&
                    <input
                        required={userInfo.resume.length === 0}
                        className='modal-input'
                        name='resume'
                        type='file'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let resumeData = new FormData();
                            resumeData.append(file.name, file);
                            setUserInfo((prevState) => ({
                                ...prevState,
                                newResume: {
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
                        if (!editing) {
                            setEditing(true);
                        } else {

                        }
                    }}
                    variant="warning">
                    {
                        editing 
                        ? 'ثبت'
                        : 'ویرایش رزومه'
                    }
                </Button>

        </div>
    );
}

export default UserInfo;