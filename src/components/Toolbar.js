import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Toolbar = ({ secret, username, logout }) => {
    const nav = useNavigate();

    function handleLogout() {
        logout();
        nav("/login");
    }

    return (
        <div style={{ backgroundColor: "#2c2c2c", color: "white" }} className="d-flex gap10 p20 border">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>

            {!secret && <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>}
            {!secret && <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>}

            {secret && <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>Upload</Link>}

            {secret && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>Welcome, {username}</span>
                <button onClick={handleLogout} style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer"
                }}>Logout</button>
            </div>}
        </div>
    );
};

export default Toolbar;
