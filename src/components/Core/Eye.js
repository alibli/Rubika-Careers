import { useState } from 'react';
import { useForm } from "react-hook-form";


function Eye() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [eyeClass, setEyeClass] = useState('fa-eye');
    const [passInputType, setPassInputType] = useState('password');

    // const toggleEye = () =>{
    //     if (eyeClass === 'fa-eye') {
    //         setEyeClass('fa-eye-slash')
    //     }
    //     else if (eyeClass === 'fa-eye-slash') {
    //         setEyeClass('fa-eye')
    //     }
    // }
    const togglePassword = () => {
        if (passInputType === 'password') {
            setPassInputType('text');
            setEyeClass('fa-eye-slash')
        }
        else if (passInputType === 'text') {
            setPassInputType('password');
            setEyeClass('fa-eye')
        }

    }

    return (
        <>
            <i className={`fa ${eyeClass} col-1 `} aria-hidden="true" onClick={togglePassword}></i>
            <input
                {...register(
                    "password",
                    {
                        required: true,
                        // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                    }
                )}
                className='modal-input col-11'
                name='password'
                type={passInputType}
                id="passInput"
            />

            <div className="form-err">
                {errors.password?.type === 'required' && "الزامی"}
                {/* {errors.password?.type === 'pattern' && "حداقل ۸ کارکتر از حروف و اعداد انگلیسی"} */}
            </div>

        </>

    );
}

export default Eye;