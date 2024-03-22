import React, { useEffect, useState } from "react";
import './LoginUser.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAccessToken } from "../context/AccessToken";
const LoginUser = ({setEnterIntoApp}) => {
    const navigate = useNavigate();
    const { setAccessToken } = useAccessToken();
    const url = "https://config.iot.mrmprocom.com/php-admin/login.php";	

    useEffect(()=>{
        if(localStorage.getItem('user'==="tanish@mrmprocom.com")){
            navigate("/dashboard", {replace: true})
        }
        else if(localStorage.getItem('user')){
            navigate("/addnewdevice", {replace: true})
        }
    },[])
    const [formData, setFormData] = useState({
        email:'', 
        password:'',
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let errors = {};

        if (formData.email.length === 0) {
            errors.email = "Email is required";
        }

        if (formData.password.length === 0) {
            errors.password = "Password is required";
        }
        
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };



    const handleLogin = () => {
        if (validateForm()) {
            axios.post(url, formData)
                .then(async (res) => {
                    console.log("res: ", res.data);
                    const { status, message, success } = res.data;
                    // console.log('status', status, message)
                    if (success !== 1) {
                        setErrorMessage(message);
                    } else {
                        
                        const data = {
                            "client_secret":"lJQNooSV69mVt4hOMF2nZFJek0NifGxh",
                            "client_id":"4aDrXj8pl2s6OPfzVKf69w4Ue2oVUr7E",
                        }
                        const headers = {
                            Accept: 'application/json',
                            apikey: 'hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'iv-user': 'developer.24004@mrmprocom.com'
                        };
                        const store = await axios.post("https://openapi.airtel.in/iot/api/developer/generate/authtoken",data,{
                            headers
                        })
                        console.log("store is: ",store)
                        localStorage.setItem('isAuthenticated',true);
                        localStorage.setItem('user', formData.email);
                        const time = store.data.data.expires_in;
                        localStorage.setItem('token',store.data.data.access_token);
                        // localStorage.setItem('expires_in', time);
                        
                        setTimeout(() => {
                            alert("time expired, please login again");
                            localStorage.clear();
                            isAdmin=false;
                            isAuthenticated=false;
                            navigate("/login");
                        }, (time)*1000);
                        // setAccessToken(store.data.data.access_token);

                        
                        if(formData.email==="tanish@mrmprocom.com") {
                            navigate("/dashboard", {replace:true});
                        }
                        else {
                            navigate("/addnewdevice", {replace:true})
                        }
                        setEnterIntoApp(prevState=>prevState+1);
                    }
                })
                .catch((error) => {
                    console.log("Error:", error);
                    setErrorMessage("An error occurred, please try again later");
                });
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return(
        <div className="LoginUserContainer">
            <div className="LoginForm" >
                <h1 className='loginFormText'>Login Form</h1>
                <div className='loginInputCont'>
                    <input 
                        type='text' 
                        name='email' 
                        placeholder='Enter Email Address...'
                        className="loginInput"
                        value={formData.email}
                        onChange={handleChange}	 
                    />
                    {errors.email && <div className="errorMessage">{errors.email}</div>}
                </div>
                <div className='loginInputCont'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your Password...'
                        className="loginInput"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="errorMessage">{errors.password}</div>}
                </div>
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                <button className='loginBtnLoginPage' onClick={handleLogin}>Login</button>
                <div className="signupCont">
                    <p style={{color: "#081242"}}>New here?</p>
                    <button className='registerBtn' onClick={handleRegister}>Register</button>
                </div>
            </div>
            <div className="CompLogoHead">
                MRM PROCOM Config IOT
            </div>
        </div>
    );
}

export default LoginUser;
