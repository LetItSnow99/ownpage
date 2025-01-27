import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const login = useUserStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Naudojame React Router navigaciją

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = login(username, password);

        if (user) {
            // Jei prisijungimas sėkmingas, nukreipiame į "Profile" puslapį
            navigate('/profile');
        } else {
            // Jei nepavyko prisijungti, rodome klaidos pranešimą
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
