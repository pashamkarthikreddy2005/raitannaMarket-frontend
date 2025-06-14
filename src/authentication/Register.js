import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import UserService from '../components/service/UserService';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'USER'
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');

        if (!validatePhoneNumber(formData.phoneNumber)) {
            setLoading(false);
            setResponseMessage("Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.");
            setIsSuccess(false);
            return;
        }

        try {
            const response = await UserService.register(formData);
            console.log("Registration Response:", response);
            if (response?.statusCode === 200) {
                setResponseMessage("User Registered Successfully");
                setIsSuccess(true);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: 'USER'
                });
                setTimeout(() => {
                    setLoading(false);
                    navigate('/home');
                }, 1000);
            } else {
                setLoading(false);
                navigate('/home');
                setResponseMessage(response?.error);
                setIsSuccess(true);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during registration:", error);
            if (error.response?.status === 409) {
                setResponseMessage("Username or Email already exists.");
            } else {
                setResponseMessage("Username or Email already exists.");
            }
            setIsSuccess(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="register-container">
                <h2 className='register-head'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            id='loginuser'
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            className='loginok'
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            className='loginok'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            className='loginok'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <p className="login-redirect">
                        Already have an account? <a href="/login">Login here</a>
                    </p>

                    <button className="submit-register" type="submit">Register</button>
                    {responseMessage && (
                        <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
            <footer className="small-footerr">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1440 320"
                    className="small-footerr-svg"
                >
                    <path 
                        fill="#07430a"
                        d="M0,315 C720,128 720,128 1440,315 L1440,320 L0,320 Z" 
                    />
                </svg>
                <div className="small-footerr-content">
                    <p>@Raitanna Market</p>
                    <p>All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    );
}

export default Register;
