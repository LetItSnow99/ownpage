import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const registerUser = useUserStore((state) => state.registerUser);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        setError(''); // Išvalome klaidų pranešimus

        // Tikriname, ar laukai užpildyti
        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        // Registruojame vartotoją
        registerUser({
            username,
            password,
            image: image || 'https://banner2.cleanpng.com/20180320/sdw/av0ohjbsy.webp', // Numatytoji profilio nuotrauka
        });

        alert('Registration successful!');
        navigate('/login'); // Perkeliame vartotoją į prisijungimo puslapį
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            <form className="register-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Profile Image URL (optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
