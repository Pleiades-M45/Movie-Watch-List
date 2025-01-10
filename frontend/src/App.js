import React, { useState, useEffect } from 'react'; // Added useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserHomepage from "./UserHomepage";
import MovieListPage from "./MovieListPage"; 
import MovieDetailPage from "./MovieDetailPage"; 
import WatchList from './WatchList';
import { UserContext } from './UserContext';
import AddMovie from './AddMovie';

function App() {
    const [user, setUser] = useState(() => {
        // Load user from localStorage on initial render
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Save user to localStorage whenever it changes
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Clear localStorage if user is null
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/userhomepage" element={<UserHomepage />} />
                    <Route path="/movielist" element={<MovieListPage />} />
                    <Route path="/movielist/:movieId" element={<MovieDetailPage />} /> {/* Dynamic route for movie details */}
                    <Route path="/watchlist" element={<WatchList />} />
                    <Route path="/addmovie" element={<AddMovie />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
