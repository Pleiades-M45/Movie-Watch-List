import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "./UserContext";
import MovieList from './MovieList';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import TopNavbar from './TopNavbar';
import './styles/UserHomepage.css';

const MovieListPage = () => {
    const [movies, setMovies] = useState([]);
    const { user } = useContext(UserContext); // Access user from Context
    
    useEffect(() => {
        fetch('http://localhost:5000/api/movies')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMovies(data.movies);
                } else {
                    console.error("Failed to fetch movies: ", data.message);
                }
            })
            .catch(err => console.error("Fetch error: ", err));
    }, []);


    return (
        <div className="user-homepage">
            <TopNavbar />
            {user?.role === 'admin' ? <AdminNavbar /> : <Navbar />}
            <div className="content">
            <h1>Movie List</h1>
            <MovieList movies={movies}  />
            </div>
        </div>
    );
};

export default MovieListPage;
