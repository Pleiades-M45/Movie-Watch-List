import React, {useContext } from 'react';
import { UserContext } from "./UserContext";
import Logout from './Logout';
import './styles/TopNavbar.css';

const TopNavbar = () => {
    const { user } = useContext(UserContext); // Access user from Context
    return (
        <div className="top-navbar">
            <h2 className="logo">Abyss</h2>
            <div className="logout">
                <Logout/>
            </div>
        </div>
    );
};

export default TopNavbar;
