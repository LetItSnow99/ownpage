import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import UsersListPage from './components/UsersListPage';
import CreatePostPage from './components/CreatePostPage';
import AllPostsPage from './components/AllPostsPage';
import SinglePostPage from './components/SinglePostPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ChatPage from './components/ChatPage';
import { useUserStore } from './store/userStore';
import './index.css';

const App = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const logout = useUserStore((state) => state.logout);

    const handleLogout = () => {
        logout(); // Atsijungimo funkcija
    };

    return (
        <Router>
            <div className="app-container">
                {/* Toolbar */}
                <nav className="toolbar">
                    {!currentUser ? (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/all-posts">All Posts</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Link to="/users-list">Users List</Link>
                            <Link to="/create-post">Create Post</Link>
                            <Link to="/all-posts">All Posts</Link>
                            <Link to="/chat">Chat</Link>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />} /> {/* Nukreipimas į „RegisterForm“ */}
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/users-list" element={<UsersListPage />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                    <Route path="/all-posts" element={<AllPostsPage />} />
                    <Route path="/single-post/:id" element={<SinglePostPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
