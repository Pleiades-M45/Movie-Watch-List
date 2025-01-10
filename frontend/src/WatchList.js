import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import MovieList from './MovieList';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import TopNavbar from './TopNavbar';
import './styles/UserHomepage.css';

const WatchList = () => {
    const { user } = useContext(UserContext); // Access user from Context
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        console.log("User from context:", user);
        if (user) {
            console.log("Fetching watchlist for user ID:", user.userId);
            fetch(`http://localhost:5000/api/watchlist/${user.userId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log("Watchlist fetch response:", data); 
                        setWatchlist(data.movies);
                        console.log("Watchlist set:", data.movies);
                    } else {
                        console.error("Failed to fetch watchlist:", data.message);
                    }
                })
                .catch((err) => console.error("Fetch error:", err));
        }
    }, [user]);

    return (
        <div className="user-homepage">
            <TopNavbar />
            {user?.role === 'admin' ? <AdminNavbar /> : <Navbar />}
            <div className="content">
                <h1>Your Watchlist</h1>
                {watchlist.length ? (
                    <MovieList movies={watchlist} />
                ) : (
                    <p>Your watchlist is empty. Add some movies to your list!</p>
                )}
            </div>
        </div>
    );
};

export default WatchList;
