import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import './styles/TopNavbar.css';

const Logout = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); // Clear user data
        navigate("/"); // Redirect to login
    };

    return <button className="nav-button" onClick={handleLogout}><img src="/images/logouticon.svg" alt="logout" /></button>;
};

export default Logout;
