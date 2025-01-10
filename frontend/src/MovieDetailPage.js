// MovieDetailPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "./UserContext";
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import TopNavbar from './TopNavbar';
import YouTubeVideoModal from './YouTubeVideoModal'; // Import the YouTubeVideoModal
import './styles/MovieDetailPage.css';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { user } = useContext(UserContext); 
    const userId = user?.userId; // Use optional chaining to safely access userId
    const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        if (!user) return;
        
        // Fetch movie details
        fetch(`http://localhost:5000/api/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMovie(data.movie);
                } else {
                    console.error("Failed to fetch movie details: ", data.message);
                }
            })
            .catch(err => console.error("Fetch error: ", err));

        // Fetch watchlist status for the user
        fetch(`http://localhost:5000/api/watchlist/${userId}/${movieId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setIsInWatchlist(data.isInWatchlist);
                } else {
                    console.error("Failed to fetch watchlist status: ", data.message);
                }
            })
            .catch(err => console.error("Fetch error: ", err));
    }, [movieId, user]);

    const handleToggleWatchlist = () => {
        if (isInWatchlist) {
            // Remove from watchlist
            fetch(`http://localhost:5000/api/watchlist`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    movieId: movieId,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setIsInWatchlist(false); // Update the state
                    } else {
                        console.error("Failed to remove from watchlist: ", data.message);
                    }
                })
                .catch(err => console.error("Fetch error: ", err));
        } else {
            // Add to watchlist
            fetch(`http://localhost:5000/api/watchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    movieId: movieId, // No watched property here
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setIsInWatchlist(true); // Update the state
                    } else {
                        console.error("Failed to add to watchlist: ", data.message);
                    }
                })
                .catch(err => console.error("Fetch error: ", err));
        }
    };

    const handleOpenYouTubeModal = () => {
        setIsYouTubeModalOpen(true);
    };

    const handleCloseYouTubeModal = () => {
        setIsYouTubeModalOpen(false);
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail-homepage">
            <TopNavbar />
            {user?.role === 'admin' ? <AdminNavbar /> : <Navbar />}
            <div className="movie-detail-page">
                <div className="movie-header">
                    <div className="movie-title-container">
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="title-description">{movie.description.substring(0, 200)}...</p>
                        <button className="trailer-button" onClick={handleOpenYouTubeModal}>
                            Watch Trailer
                        </button>
                        <p></p>
                        <button
                            className={`watchlist-button ${isInWatchlist ? 'added' : ''}`}
                            onClick={handleToggleWatchlist}
                        >
                            {isInWatchlist ? 'Remove from Watchlist' : '+ Add to Watchlist'}
                        </button>
                    </div>
                    <div className="movie-bg-container">
                        <img src={movie.bg_poster_url} alt={movie.title} className="bg-poster" />
                    </div>
                </div>
                <div className="movie-info">
                    <img src={movie.poster_url} alt={movie.title} className="poster" />
                    <p className="detail-description">
                        <h2>Storyline</h2>
                        {movie.description}
                    </p>
                </div>
                {/* Render the YouTubeVideoModal */}
                {isYouTubeModalOpen && (
                    <YouTubeVideoModal videoUrl={movie.youtube_url} onClose={handleCloseYouTubeModal} />
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
