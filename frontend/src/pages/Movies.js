import React, { useState } from 'react';
import axios from 'axios';
import './Commons.css';

const Movies = ({ isAdmin }) => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [filterRating, setFilterRating] = useState('All');
    const [editId, setEditId] = useState(null);


    const handleFetchReviews = () => {
        axios.get('http://localhost:8080/api/movies')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching movie reviews:', error);
            });
    };

    const handleAddOrUpdateReview = () => {
        const newReview = { movieName, review, rating };
        if (editId) {
            axios.put(`http://localhost:8080/api/movies/${editId}`, newReview)
                .then(() => {
                    handleFetchReviews();
                    handleResetForm();
                })
                .catch((error) => console.error('Error updating movie review:', error));
        } else {
            axios.post('http://localhost:8080/api/movies', newReview)
                .then(() => {
                    handleFetchReviews();
                    handleResetForm();
                })
                .catch((error) => console.error('Error adding movie review:', error));
        }
    };

    const handleDeleteReview = (id) => {
        axios.delete(`http://localhost:8080/api/movies/${id}`)
            .then(() =>{
                console.log('Review deleted:', id);
                handleFetchReviews()
            })
            .catch((error) => console.error('Error deleting movie review:', error));
    };

    const handleEditReview = (review) => {
        setMovieName(review.movieName);
        setReview(review.review);
        setRating(review.rating);
        setEditId(review.id);
    };

    const handleResetForm = () => {
        setMovieName('');
        setReview('');
        setRating(1);
        setEditId(null);
    };

    const handleFilterChange = (e) => {
        setFilterRating(e.target.value);
    };

    const filteredReviews = reviews.filter((r) => filterRating === 'All' || r.rating === parseInt(filterRating));

    return (
        <div className="movies-page">
            <div className="description-bubble">
                <h2><span role="img" aria-label="movie-icon">🎥</span> Movies</h2>
                <p>My harsh (but not so impactful) movie reviews. I can guarantee 5-star movies are objectively good tho! 🍿🎥⋆⭒˚.⋆📺❀˖°🎞⋆⭒˚.⋆️🎬⋆༺𓆩☠︎︎𓆪༻⋆</p>
            </div>
            <div className="reviews-section">
                <h2>Reviews</h2>
                <button className="button" onClick={handleFetchReviews}>See Reviews</button>
                <div className="filter-section">
                    <label>Filter by Rating: </label>
                    <select value={filterRating} onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div className="reviews-list">
                    {filteredReviews.map((r) => (
                        <div key={r.id} className="review-item">
                            <h3>{r.movieName}</h3>
                            <p>{r.review}</p>
                            <div className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                            {isAdmin && (
                                <div className="review-buttons">
                                    <button className="button delete-button" onClick={() => handleDeleteReview(r.id)}>Delete</button>
                                    <button className="button update-button" onClick={() => handleEditReview(r)}>Edit</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {isAdmin && (
                <div className="add-review-section">
                    <h2>{editId ? 'Update Review' : 'Add a Review'}</h2>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)} // Update book name state on change
                        className="input-movie-name"
                    />
                    <textarea
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)} // Update review text state on change
                        className="review-textarea"
                    />
                    <div>
                        <label>Rating: </label>
                        <input type="number" min="1" max="5" value={rating}
                               onChange={(e) => setRating(Number(e.target.value))}/>
                    </div>
                    <button className="button"
                            onClick={handleAddOrUpdateReview}>{editId ? 'Update Review' : 'Add Review'}</button>
                    {editId && <button className="button cancel-button" onClick={handleResetForm}>Cancel</button>}
                </div>
            )}
        </div>
    );
};

export default Movies;
