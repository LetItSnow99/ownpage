import React, { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";

const IndexPage = ({ username, secret }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching all posts...");
        fetch("http://167.99.138.67:1111/getallposts")
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    console.log("Posts fetched:", response.data);

                    const userPosts = response.data.filter((post) => post.username === username);
                    const otherPosts = response.data.filter((post) => post.username !== username);

                    setItems([...userPosts, ...otherPosts]);
                } else {
                    setError("Unable to load posts.");
                }
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to fetch posts.");
            });
    }, [username]);

    function removeSingleItem(id) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div className="d-flex wrap gap10">
            {items.map((x) => (
                <SinglePost
                    remove={removeSingleItem}
                    secret={secret}
                    username={username}
                    post={x}
                    key={x.id}
                />
            ))}
        </div>
    );
};

export default IndexPage;
