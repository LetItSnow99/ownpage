import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const SinglePost = ({ post, username, secret, remove }) => {
    const nav = useNavigate();
    const location = useLocation();

    function deletePost() {
        const item = {
            secretKey: secret,
            id: post.id,
        };

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(item),
        };

        fetch("http://167.99.138.67:1111/deletepost", options)
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    if (location.pathname === "/") {
                        remove(item.id);
                    } else {
                        nav("/");
                    }
                }
            });
    }

    return (
        <div className="border p20 post">
            <img
                src={post.image}
                alt="Post image"
                onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                style={{ width: "100%", height: "auto" }}
            />

            <Link to={`/singlePost/${post.username}/${post.id}`}>
                <h4>{post.title}</h4>
            </Link>

            <Link to={`/userPosts/${post.username}`}>
                <b>{post.username}</b>
            </Link>

            {post.username === username && (
                <div className="mt3">
                    <button onClick={deletePost}>Delete</button>
                    <button
                        onClick={() => nav(`/editPost/${post.id}`)}
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
