import React, { useState } from 'react';
import { usePostStore } from '../store/postStore';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const addPost = usePostStore((state) => state.addPost);
    const currentUser = useUserStore((state) => state.currentUser);
    const navigate = useNavigate();

    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleCreatePost = () => {
        if (!image || !description) {
            alert('Please fill in all fields.');
            return;
        }

        if (!currentUser) {
            alert('You must be logged in to create a post.');
            return;
        }

        addPost(image, description, currentUser.username);
        alert('Post created successfully!');
        navigate('/all-posts');
    };

    return (
        <div className="create-post-page">
            <h1>Create Post</h1>
            <form className="create-post-form">
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="button" onClick={handleCreatePost}>
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;
