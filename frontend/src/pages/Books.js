import React, { useState } from 'react';
import axios from 'axios';
import './Commons.css';

const Books = ({ isAdmin }) => {
    // State hooks for storing form inputs, reviews list, and edit status
    const [bookName, setBookName] = useState(''); // Stores the book name
    const [review, setReview] = useState(''); // Stores the review text
    const [rating, setRating] = useState(1); // Stores the rating value
    const [reviews, setReviews] = useState([]); // Stores the list of reviews fetched from the backend
    const [filterRating, setFilterRating] = useState('All'); // Stores the rating filter value
    const [editId, setEditId] = useState(null); // Stores the id of the review being edited (null if not editing)

    const handleFetchReviews = () => {
        axios.get('http://localhost:8080/api/books')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    };

    const handleAddOrUpdateReview = () => {
        const newReview = {
            bookName,
            review,
            rating,
        };

        if (editId) {
            // If editId is set, update an existing review
            axios.put(`http://localhost:8080/api/books/${editId}`, newReview)
                .then(() => {
                    console.log('Review updated:', editId);
                    handleFetchReviews();
                    handleResetForm();
                })
                .catch((error) => {
                    console.error('Error updating review:', error);
                });
        } else {
            // If editId is not set, add a new review
            axios.post('http://localhost:8080/api/books', newReview)
                .then((response) => {
                    console.log('Review added:', response.data);
                    handleFetchReviews();
                    handleResetForm(); // Reset the form
                })
                .catch((error) => {
                    console.error('Error adding review:', error);
                });
        }
    };

    const handleDeleteReview = (id) => {
        axios.delete(`http://localhost:8080/api/books/${id}`)
            .then(() => {
                console.log('Review deleted:', id);
                handleFetchReviews();
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
            });
    };

    const handleEditReview = (review) => {
        setBookName(review.bookName); // Set book name to edit
        setReview(review.review); // Set review text to edit
        setRating(review.rating); // Set rating to edit
        setEditId(review.id);
    };

    const handleResetForm = () => {
        setBookName(''); // Clear book name
        setReview(''); // Clear review text
        setRating(1); // Reset rating to 1
        setEditId(null); // Clear editId (stop editing)
    };

    //handle changes in filter rating dropdown
    const handleFilterChange = (e) => {
        setFilterRating(e.target.value); //update filterRating state with selected value
    };

    //filter reviews based on selected rating
    const filteredReviews = reviews.filter((r) => {
        if (filterRating === 'All') return true; // If 'All' is selected, show all reviews
        return r.rating === parseInt(filterRating); // Show reviews that match selected rating
    });

    return (
            <div className="books-page">
                <div className="description-bubble">
                    <h2><span role="img" aria-label="book-icon">📚</span> Books </h2>
                    <p>Mostly consists of Classics, Fantasy, Sci-Fi and Crime novels. I love giving book advices, hope you like them!  <span role="img" aria-label="popcorn">🍃🌙🪞🪷✨📜˚˖𓍢ִ໋🌷͙֒✧˚.🎀༘⋆✩°𓏲⋆🌿. ⋆⸜ 🍵✮˚༄˖°.☕️.ೃ࿔📚*:･🍄ﾟ✧🌾₊˚ʚ 🌿˚✧ ﾟ.🌻🌱ﾟ🌼</span></p>
                </div>

                <div className="reviews-section">
                    <h2>Reviews</h2>
                    <button className="button" onClick={handleFetchReviews}>See Reviews</button>

                    {/* Filter section */}
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

                    {/* List of reviews */}
                    <div className="reviews-list">
                        {filteredReviews.map((r, index) => (
                            <div key={index} className="review-item"> {/* Display each review item */}
                                <h3>{r.bookName}</h3> {/* Book name */}
                                <p>{r.review}</p> {/* Review text */}
                                <div className="stars">
                                    {'★'.repeat(r.rating)} {/* Display filled stars based on rating */}
                                    {'☆'.repeat(5 - r.rating)} {/* Display unfilled stars based on rating */}
                                </div>
                                {isAdmin && (
                                <div className="review-buttons">
                                    <button className="button delete-button" onClick={() => handleDeleteReview(r.id)}>Delete</button> {/* Delete button */}
                                    <button className="button update-button" onClick={() => handleEditReview(r)}>Edit</button> {/* Edit button */}
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section to Add or Update a Review */}
                {isAdmin && (
                <div className="add-review-section">
                    <h2>{editId ? 'Update Review' : 'Add a Review'}</h2>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className="input-book-name"
                    />
                    <textarea
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="review-textarea"
                    />
                    <div>
                        <label>Rating: </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                    </div>
                    <button className="button" onClick={handleAddOrUpdateReview}>
                        {editId ? 'Update Review' : 'Add Review'} {/* Button label changes based on edit or add mode */}
                    </button>
                    {editId && (
                        <button className="button cancel-button" onClick={handleResetForm}>
                            Cancel
                        </button>
                    )}
                </div>
                )}
            </div>
    );
};

export default Books;
