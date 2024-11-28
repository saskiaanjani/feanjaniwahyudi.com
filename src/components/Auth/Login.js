import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import configUrl from '../../ConfigUrl';
import GoogleLoginButton from '../GoogleLoginButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${configUrl.beBaseUrl}/api/login`, { email, password });
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('authTokenSitusNews', token);
      localStorage.setItem('userSitusNews', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

 const styles = { 
    loginContainer: {
      maxWidth: '300px',
      margin: '0 auto',
      padding: '30px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      marginBottom: '10px',
    },
    paragraph: {
      fontSize: '14px',
      color: '#555',
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    eyeIcon: {
      position: 'absolute',
      right: '10px',
      top: 'calc(35% - 0.5em)', 
      cursor: 'pointer',
      fontSize: '16px', 
    },
    forgotPassword: {
      display: 'block',
      margin: '10px 0',
      fontSize: '12px',
      color: '#007BFF',
      textDecoration: 'none',
    },
    loginBtn: {
      width: '110%',
      padding: '10px',
      backgroundColor: '#d50000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    orTextContainer: {
      margin: '20px 0', 
      textAlign: 'center',
    },
    orText: { 
      fontSize: '14px',
      color: '#555',
      margin: '0', 
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '40px',
    },
    backIcon: {
      marginRight: '8px',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
        Kembali ke Home
      </div>
      <h2 style={styles.heading}>Login</h2>
      <p style={styles.paragraph}>
        Login dulu biar bisa komen dan atur notifikasi konten favoritmu. Yuk!
      </p>
      <form onSubmit={handleLSubmit} style={{margin: '40px auto'}}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            style={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <a href="/reset-password" style={styles.forgotPassword}>
          Register
        </a>
        <button type="submit" style={styles.loginBtn}>
          Masuk
        </button>
        <div style={styles.orTextContainer}>
          <p style={styles.orText}>atau login dengan</p>
        </div>
        <GoogleLoginButton />
      </form>
    </div>
  );
};

export default LoginForm;
