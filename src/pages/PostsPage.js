// Updated SinglePost.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SinglePost = ({ post, username, secret, remove }) => {
    const nav = useNavigate();
    const location = useLocation();

    const deletePost = async () => {
        try {
            const confirmDelete = window.confirm("Ar tikrai norite ištrinti šį postą?");
            if (!confirmDelete) return;

            const response = await fetch("http://167.99.138.67:1111/deletepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secretKey: secret,
                    id: post.id,
                }),
            });

            const data = await response.json();
            if (data.success) {
                if (location.pathname === "/") {
                    remove(post.id);
                } else {
                    nav("/");
                }
            } else {
                alert("Nepavyko ištrinti posto: " + data.message);
            }
        } catch (error) {
            console.error("Klaida trinant postą:", error);
            alert("Įvyko klaida trinant postą.");
        }
    };

    return (
        <div className="border p20 post">
            <img src={post.image || "https://via.placeholder.com/150"} alt="" />

            <Link to={`/singlePost/${post.username}/${post.id}`}>
                <h4>{post.title || "Nėra pavadinimo"}</h4>
            </Link>

            <Link to={`/userPosts/${post.username}`}>
                <b>{post.username || "Anonimas"}</b>
            </Link>

            {post.username === username && (
                <div className="mt3">
                    <button onClick={deletePost}>Ištrinti</button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
