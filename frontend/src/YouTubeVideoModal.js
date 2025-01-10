import React from 'react';
import './styles/YouTubeVideoModal.css'; // Import your CSS styles

const YouTubeVideoModal = ({ videoUrl, onClose }) => {
    if (!videoUrl) return null; // If no URL, don't render

    // Function to extract video ID from the YouTube URL
    const getVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch)?\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null; // Return the video ID
    };

    const videoId = getVideoId(videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <iframe
                    width="1200"
                    height="700"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubeVideoModal;
