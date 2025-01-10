import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import MovieList from './MovieList';
import MovieDetailsModal from './MovieDetailsModal';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import TopNavbar from './TopNavbar';
import './styles/AddMovie.css';
import './styles/UserHomepage.css';

const AddMoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Fetch all movies
        fetch('http://localhost:5000/api/movies')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMovies(data.movies);
                } else {
                    console.error('Failed to fetch movies:', data.message);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    const handleAddNewMovie = () => {
        setSelectedMovie({ isNew: true }); // Open modal with empty movie data
    };

    const handleEditMovie = (movie) => {
        setSelectedMovie(movie); // Open modal for the selected movie
    };

    const handleCloseModal = () => {
        setSelectedMovie(null); // Close modal
    };

    const handleDeleteMovie = (movieId) => {
        fetch(`http://localhost:5000/api/movies/${movieId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
                    setSelectedMovie(null); // Close modal
                } else {
                    console.error('Failed to delete movie:', data.message);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    };

    return (
        <div className="user-homepage">
            <TopNavbar />
            {user?.role === 'admin' ? <AdminNavbar /> : <Navbar />}
            <div className="content">
                <h1>Movie List</h1>
                <div className="movie-list">
                    {/* Add New Movie Card */}
                    <div className="movie-card add-movie-card" onClick={handleAddNewMovie}>
                        <span className="add-icon">+</span>
                        <p>Add a New Movie</p>
                    </div>
                    {/* Render Movie List */}
                    <MovieList movies={movies} onMovieClick={handleEditMovie} />
                </div>
            </div>
            {selectedMovie && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteMovie}
                />
            )}
        </div>
    );
};

export default AddMoviePage;
