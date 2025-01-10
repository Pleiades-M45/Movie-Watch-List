import React, { useContext } from 'react';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import TopNavbar from './TopNavbar';
import { UserContext } from "./UserContext";
import './styles/UserHomepage.css';

const UserHomePage = () => {
    const { user } = useContext(UserContext); // Access user details    
    return (
        <div className="user-homepage">
            <TopNavbar />
            {user?.role === 'admin' ? <AdminNavbar /> : <Navbar />}
            <div className="content">
                <h1>Welcome {user?.username || "Guest"}!</h1>
            </div>
        </div>
    );
};

export default UserHomePage;
