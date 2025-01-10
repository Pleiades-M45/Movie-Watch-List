import React, { useState } from 'react';
import './styles/MovieDetailsModal.css';

const MovieDetailsModal = ({ movie, onClose, onDelete }) => {
    const [isEditing, setIsEditing] = useState(movie?.isNew || false);
    const [editedMovie, setEditedMovie] = useState(movie || {});
    const [previewPoster, setPreviewPoster] = useState(movie?.poster_url || null);
    const [previewBgPoster, setPreviewBgPoster] = useState(movie?.bg_poster_url || null);
    const [loading, setLoading] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        if (!editedMovie.title) {
            alert('Title is required!');
            return;
        }

        const apiEndpoint = movie?.isNew
            ? 'http://localhost:5000/api/admin/addmovie'
            : `http://localhost:5000/api/admin/editmovie/${movie.id}`;
        const method = movie?.isNew ? 'POST' : 'PUT';

        const formData = new FormData();
        formData.append('title', editedMovie.title);
        formData.append('description', editedMovie.description);
        formData.append('youtube_url', editedMovie.youtube_url || '');
        if (editedMovie.posterFile) formData.append('poster', editedMovie.posterFile);
        if (editedMovie.bgPosterFile) formData.append('bgPoster', editedMovie.bgPosterFile);

        setLoading(true);
        fetch(apiEndpoint, {
            method,
            body: formData,
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert('Movie saved successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to save movie: ' + data.message);
                }
            })
            .catch((err) => console.error('Error saving movie:', err))
            .finally(() => setLoading(false));
    };

    const handleFilePreview = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (type === 'poster') {
                    setPreviewPoster(reader.result);
                    setEditedMovie({ ...editedMovie, posterFile: file });
                } else if (type === 'bgPoster') {
                    setPreviewBgPoster(reader.result);
                    setEditedMovie({ ...editedMovie, bgPosterFile: file });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            fetch(`http://localhost:5000/api/admin/deletemovie/${movie.id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        console.error('Failed to delete movie:', data.message);
                    }
                })
                .catch((err) => console.error('Error deleting movie:', err));
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {loading && <p>Loading...</p>}
                <div className="modal-body">
                    {isEditing ? (
                        <form onSubmit={handleSave}>
                            <div className="form-container">
                                <div className="form-fields">
                                    <h2>{movie?.isNew ? 'Add New Movie' : 'Edit Movie'}</h2>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        required
                                        value={editedMovie.title || ''}
                                        onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
                                    />
                                    <label>Description:</label>
                                    <textarea
                                        value={editedMovie.description || ''}
                                        onChange={(e) => setEditedMovie({ ...editedMovie, description: e.target.value })}
                                    />
                                    <label>YouTube URL:</label>
                                    <input
                                        type="text"
                                        value={editedMovie.youtube_url || ''}
                                        onChange={(e) => setEditedMovie({ ...editedMovie, youtube_url: e.target.value })}
                                    />
                                    <label>Poster:</label>
                                    <input type="file" onChange={(e) => handleFilePreview(e, 'poster')} />
                                    {previewPoster && (
                                        <div className="poster-preview-container">
                                            <img src={previewPoster} alt="Poster Preview" className="poster-preview" />
                                        </div>
                                    )}
                                    <label>Background Poster:</label>
                                    <input type="file" onChange={(e) => handleFilePreview(e, 'bgPoster')} />
                                    {previewBgPoster && (
                                        <div className="bg-poster-preview-container">
                                            <img src={previewBgPoster} alt="Background Poster Preview" className="bg-poster-preview" />
                                        </div>
                                    )}
                                    <div className="modal-buttons">
                                        <button type="submit" disabled={loading}>Save</button>
                                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    ) : (
                        <>
                            <h2>{movie.title}</h2>
                            <img src={movie.bg_poster_url} alt={movie.title} className="bg-poster-modal" />
                            <p>{movie.description}</p>
                            {movie.youtube_url && (
                                <p>
                                    Trailer: <a href={movie.youtube_url} target="_blank" rel="noopener noreferrer">{movie.youtube_url}</a>
                                </p>
                            )}
                        </>
                    )}
                </div>
                {!isEditing && (
                    <div className="modal-buttons">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Remove</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsModal;
