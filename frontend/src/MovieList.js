import React from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies, onMovieClick }) => {
    const navigate = useNavigate();

    const handleMovieSelect = (movie) => {
        if (onMovieClick) {
            onMovieClick(movie); // Use the provided function if it exists
        } else {
            navigate(`/movielist/${movie.id}`); // Default behavior if no function is provided
        }
    };
    
    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieSelect(movie)} />
            ))}
        </div>
    );
};

export default MovieList;
