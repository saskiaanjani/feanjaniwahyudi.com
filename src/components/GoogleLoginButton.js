import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import configUrl from '../ConfigUrl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        try {
            const response = await axios.post(`${configUrl.beBaseUrl}/api/logingoogle`, {
                token: credentialResponse.credential,
            });

            if (response.data.token && response.data.user.email === 'wahyudianjani54@gmail.com') {
               
                sessionStorage.setItem('authTokenSitusNews', response.data.token);
                sessionStorage.setItem('userSitusNews', JSON.stringify(response.data.user));

                localStorage.setItem('authTokenSitusNews', response.data.token);
                localStorage.setItem('userSitusNews', JSON.stringify(response.data.user));
                login();
                navigate('/');
            } else {
                alert('email ini tidak terdaftar');
                navigate('/login');
            }
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="827302811949-4lqlbiu7uutak0mvsqo9tthoivohd1uo.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log('Login Failed')}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
