import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/userhomepage"><img src="/images/homeicon.svg" alt="Home" /></Link>
            <Link to="/movielist"><img src="/images/movieicon.svg" alt="List" /></Link>
            <Link to="/watchlist"><img src="/images/watchicon.svg" alt="Watchlist" /></Link>
            {/* <Link to="/search"><img src="/images/searchicon.svg" alt="Search" /></Link> */}
        </div>
    );
};

export default Navbar;
