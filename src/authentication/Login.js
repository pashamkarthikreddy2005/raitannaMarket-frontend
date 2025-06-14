import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loader from '../components/Loader';
import UserService from '../components/service/UserService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = await UserService.login(username, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                
                setTimeout(() => {
                    setLoading(false);
                    if (userData.role === "USER") {
                        navigate('/home');
                    } else if (userData.role === "ADMIN") {
                        navigate('/all-claims');
                    } else {
                        navigate('/Organizationhome');
                    }
                }, 1000);
            } else {
                setLoading(false);
                setError(userData.error || 'Login failed');
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred during login.');
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                
                <div className="login-container">
                    {/* <a href="http://localhost:5000/auth/google">Login with Google</a> */}
                    <h2 className='login-head'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                id='login-username'
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                id='login-password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-submit" type="submit">Login</button>
                        {error && <p className="response-message error">{error}</p>}
                    </form>

                    <p className="register-redirect">
                        Don’t have an account? <a href="/register">Register here</a>
                    </p>


                </div>
            )}
            <footer className="small-footer">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1440 320"
                    className="small-footer-svg"
                >
                    <path 
                        fill="#07430a"
                        d="M0,315 C720,128 720,128 1440,315 L1440,320 L0,320 Z" 
                    />
                </svg>
                <div className="small-footer-content">
                    <p>@Raitanna Market</p>
                    <p>All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    );
}

export default Login;
