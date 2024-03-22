import React, { useState, useEffect } from "react";
import './RegisterUser.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterUser({ isAdmin, isAuthenticated }) {
    const navigate = useNavigate();
    const [verifyEmailSent, setVerifyEmailSent] = useState(false);
    const url = "https://config.iot.mrmprocom.com/php-admin/register.php";
    // const verifyUrl = "https://config.iot.mrmprocom.com/php-admin/verifyEmail.php";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        navigate("/login");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        localStorage.clear();
    }, [])

    const validateForm = () => {
        let errors = {};

        if (formData.name.length < 3 || formData.name.length > 15) {
            errors.name = "Invalid name length";
        }

        if (!formData.email.includes('@')) {
            errors.email = "Invalid email address";
        }

        if (formData.password.length < 8 || formData.password.length > 16) {
            errors.password = "Password must be between 8 and 16 characters";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.post(url, formData)
                .then((res) => {
                    console.log("res: ", res.data);

                    if (res.data.success === 1) setVerifyEmailSent(true);
                    else {

                        setErrors({ common: "Email already registered, please login" })
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        const { message, fields } = error.response.data;
                        setErrors({ ...fields, common: message });
                    } else {
                        setErrors({ common: "An error occurred, please try again later" });
                    }
                    console.log("Error is : ", error);
                });
        }
    };

    // Function to verify email
    const verifyEmail = () => {
        navigate("/login");
    };

    return (
        <div className="RegisterUserContainer">
            {
                verifyEmailSent ? (
                    <div className="VerifyEmailContainer">
                        <div className="EmailContContent">
                            <div className="contentHeading">
                                Account Confirmation
                            </div>
                            <div className="verificationEmailContent">
                                <p>An Email with your account confirmation link has been sent to your email {formData.email}</p>
                                <p>Check your email and comeback to proceed!</p>
                            </div>
                            {/* Call verifyEmail function with the verification code */}
                            <button className="verificationEmailBtn" onClick={() => verifyEmail()}>
                                Proceed
                            </button>
                        </div>
                    </div>
                )
                    : (
                        <div className='signupForm'>
                            <h1 className='signupFormText'>Register Form</h1>
                            <div className='signupInputCont'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Enter user name...'
                                    value={formData.name}
                                    className="signupInput"
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="errorMessage">{errors.name}</div>}
                            </div>
                            <div className='signupInputCont'>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Enter Email Address...'
                                    value={formData.email}
                                    className="signupInput"
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="errorMessage">{errors.email}</div>}
                            </div>
                            <div className='signupInputCont'>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Enter your Password...'
                                    value={formData.password}
                                    className="signupInput"
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="errorMessage">{errors.password}</div>}
                            </div>
                            {errors.common && <div className="errorMessage">{errors.common}</div>}
                            <button className='registerBtnRegisterPage' onClick={handleRegister}>Register</button>
                            {/* <button className='loginBtnRegisterPage' onClick={handleLogin}>Login</button> */}
                            <div className="signupCont">
                                <p style={{ color: "#081242" }}>Already Registered? </p>
                                <button className='loginBtnRegisterPage' onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    )
            }
            <div className="CompLogoHead">
                MRM PROCOM Config IOT
            </div>
        </div>
    );
}

export default RegisterUser;
