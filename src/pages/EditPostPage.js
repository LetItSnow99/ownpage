import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = ({ secret }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const titleRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        console.log("Attempting to fetch post data with ID:", id);

        const mockResponse = {
            success: true,
            data: {
                id: id,
                title: "Mock Title",
                image: "https://via.placeholder.com/150",
                description: "This is a mock description.",
            },
        };

        setTimeout(() => {
            console.log("Using mock response:", mockResponse);
            setPost(mockResponse.data);
        }, 500);

    }, [id]);

    function handleUpdate() {
        const updatedPost = {
            id,
            secretKey: secret,
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value,
        };

        console.log("Updating post with data:", updatedPost);

        // Užklausa API
        fetch("http://167.99.138.67:1111/updatepost", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedPost),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("Update Response:", response);
                if (response.success) {
                    navigate("/");
                } else {
                    setError("Failed to update post: " + response.message);
                }
            })
            .catch((err) => {
                console.error("Update error:", err);
                setError("Failed to update the post. Server might be down.");
            });
    }

    if (!post) return <h2>{error || "Loading post..."}</h2>;

    return (
        <div className="d-flex j-center">
            <div className="d-flex direction-col gap10 authForm">
                <h1>Edit Post</h1>
                <input
                    type="text"
                    defaultValue={post.title}
                    ref={titleRef}
                    placeholder="Title"
                />
                <input
                    type="text"
                    defaultValue={post.image}
                    ref={imageRef}
                    placeholder="Image URL"
                />
                <textarea
                    defaultValue={post.description}
                    ref={descriptionRef}
                    placeholder="Description"
                />
                {error && <h3 style={{ color: "red" }}>{error}</h3>}
                <div className="d-flex gap10">
                    <button onClick={() => navigate("/")}>Back</button>
                    <button onClick={handleUpdate}>Change</button>
                </div>
            </div>
        </div>
    );
};

export default EditPostPage;
