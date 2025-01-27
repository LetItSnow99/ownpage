import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useUserStore } from '../store/userStore';

const SinglePostPage = () => {
    const { id } = useParams();
    const posts = usePostStore((state) => state.posts);
    const addComment = usePostStore((state) => state.addComment);
    const likePost = usePostStore((state) => state.likePost);
    const removeComment = usePostStore((state) => state.removeComment);
    const removePost = usePostStore((state) => state.removePost);
    const currentUser = useUserStore((state) => state.currentUser);
    const navigate = useNavigate();

    const post = posts.find((p) => p.id === parseInt(id));
    const [comment, setComment] = useState('');
    const [showModal, setShowModal] = useState(false);

    if (!post) return <p>Post not found.</p>;

    const handleLike = () => {
        if (!currentUser) {
            alert('You must be logged in to like a post.');
            return;
        }
        likePost(post.id, currentUser.username);
    };

    const handleComment = () => {
        if (comment.trim()) {
            addComment(post.id, currentUser.username, comment);
            setComment('');
        }
    };

    const handleDeleteComment = (commentIndex) => {
        if (!currentUser) return;
        removeComment(post.id, commentIndex);
    };

    const handleDeletePost = () => {
        if (!currentUser || currentUser.username !== post.username) {
            alert('You can only delete your own posts.');
            return;
        }
        setShowModal(true); // Parodome modalą
    };

    const confirmDeletePost = () => {
        removePost(post.id); // Ištriname įrašą
        setShowModal(false); // Uždaryti modalą
        navigate('/all-posts'); // Perkelti į visų įrašų puslapį
    };

    const cancelDeletePost = () => {
        setShowModal(false); // Uždaryti modalą
    };

    return (
        <div className="single-post">
            <img src={post.image} alt="Post" className="post-image" />
            <div className="post-details">
                <h1>Post Details</h1>
                <p>{post.description}</p>
                <p>Posted by: <strong>{post.username}</strong></p>
                <p>Likes: {post.likes.length}</p>
                <button onClick={handleLike} disabled={post.likes.includes(currentUser?.username)}>
                    {post.likes.includes(currentUser?.username) ? 'Liked' : 'Like'}
                </button>

                {currentUser?.username === post.username && (
                    <button onClick={handleDeletePost} className="delete-post-button">
                        Delete Post
                    </button>
                )}

                <h2>Comments</h2>
                {post.comments.map((c, index) => (
                    <div key={index} className="comment">
                        <p>
                            <strong>{c.username}:</strong> {c.comment}
                        </p>
                        {currentUser?.username === c.username && (
                            <button onClick={() => handleDeleteComment(index)}>Delete</button>
                        )}
                    </div>
                ))}

                {currentUser ? (
                    <div className="add-comment">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button onClick={handleComment}>Add Comment</button>
                    </div>
                ) : (
                    <p>You must be logged in to comment.</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Delete Post?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDeletePost} className="confirm-button">
                                Yes
                            </button>
                            <button onClick={cancelDeletePost} className="cancel-button">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePostPage;
