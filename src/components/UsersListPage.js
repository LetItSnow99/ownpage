import React from 'react';
import { useUserStore } from '../store/userStore';

const UsersListPage = () => {
    const users = useUserStore((state) => state.users);
    const currentUser = useUserStore((state) => state.currentUser);

    return (
        <div className="users-list-page">
            <h1>Users List</h1>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.username} className="user-list-item">
                        <span
                            className={`status-indicator ${
                                currentUser?.username === user.username ? 'online' : 'offline'
                            }`}
                        ></span>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersListPage;
