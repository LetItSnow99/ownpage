import React from 'react';
import { usePostStore } from '../store/postStore';
import { Link } from 'react-router-dom';

const AllPostsPage = () => {
    const posts = usePostStore((state) => state.posts);

    return (
        <div className="all-posts-page">
            <h1>All Posts</h1>
            <div className="post-grid">
                {posts.map((post) => (
                    <Link to={`/single-post/${post.id}`} key={post.id} className="post-item">
                        <img src={post.image} alt="Post" />
                        <p>{post.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllPostsPage;
