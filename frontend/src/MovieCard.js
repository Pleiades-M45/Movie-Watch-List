import React from 'react';
import './styles/MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <img src={movie.poster_url} alt={movie.title} />
            <h4>{movie.title}</h4>
        </div>
    );
};

export default MovieCard;
