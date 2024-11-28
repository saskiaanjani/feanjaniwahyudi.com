import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the arrow left icon
import configUrl from '../../ConfigUrl';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate(); // For navigation

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Password baru tidak cocok!');
            return;
        }

        try {
            const response = await axios.post(`${configUrl.beBaseUrl}/api/reset-password`, {
                email,
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            });

            setSuccess(response.data.message);
            setEmail('');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
        } catch (err) {
            setError(err.response.data.message || 'Terjadi kesalahan!');
        }
    };

    const handleBackToLogin = () => {
        navigate('/login'); // Navigate back to login
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '30px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '20px',
            position: 'relative',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
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
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#d50000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        errorMessage: {
            color: 'red',
            marginTop: '20px',
        },
        successMessage: {
            color: 'green',
            marginTop: '20px',
        },
        backContainer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '20px',
            color: '#007BFF',
            textDecoration: 'none',
        },
        backIcon: {
            marginRight: '8px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.backContainer} onClick={handleBackToLogin}>
                <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
                <span>Kembali ke Login</span>
            </div>
            <h2 style={styles.heading}>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password Lama:</label>
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <FontAwesomeIcon
                        icon={showOldPassword ? faEye : faEyeSlash}
                        style={styles.eyeIcon}
                        onClick={toggleOldPasswordVisibility}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password Baru:</label>
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <FontAwesomeIcon
                        icon={showNewPassword ? faEye : faEyeSlash}
                        style={styles.eyeIcon}
                        onClick={toggleNewPasswordVisibility}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Konfirmasi Password Baru:</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                        style={styles.eyeIcon}
                        onClick={toggleConfirmPasswordVisibility}
                    />
                </div>
                <button type="submit" style={styles.button}>Reset Password</button>
            </form>
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>{success}</p>}
        </div>
    );
};

export default ResetPassword;
