import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const updateUser = useUserStore((state) => state.updateUser);
    const deleteUser = useUserStore((state) => state.deleteUser);
    const navigate = useNavigate();

    const [username, setUsername] = useState(currentUser?.username || '');
    const [image, setImage] = useState(currentUser?.image || '');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveChanges = () => {
        if (!username.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        updateUser({ username, image });
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleDeleteProfile = () => {
        if (confirmPassword !== currentUser.password) {
            setError('Invalid password. Cannot delete profile.');
            return;
        }

        const result = deleteUser(currentUser.username, confirmPassword);
        if (result?.success) {
            alert('Profile deleted successfully!');
            navigate('/register');
        } else {
            setError(result?.error || 'Something went wrong.');
        }
    };

    if (!currentUser) {
        return (
            <div className="profile-page">
                <h1>No user is logged in</h1>
                <p>Please log in or register to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h1 style={{ fontSize: '2rem' }}>Profile Page</h1>
            <img
                src={image || 'https://banner2.cleanpng.com/20180320/sdw/av0ohjbsy.webp'}
                alt="Profile"
                className="profile-image"
            />
            <h2>Username: {currentUser.username}</h2>
            {isEditing ? (
                <div className="edit-profile">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Profile Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    {error && <p className="error">{error}</p>}
                </div>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <div className="delete-profile">
                        <input
                            type="password"
                            placeholder="Enter password to delete profile"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={handleDeleteProfile}>Delete Profile</button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
