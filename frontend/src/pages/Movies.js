import React, { useState } from 'react'; // Import React and useState hook for managing state in the component
import axios from 'axios'; // Import axios for making HTTP requests
import Layout from './Layout'; // Import Layout component to maintain consistent page structure
import './Commons.css';

const Movies = () => {
    //hooks for storing form inputs, reviews list, and edit status
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]); // Stores the list of reviews fetched from the backend
    const [filterRating, setFilterRating] = useState('All'); // Stores the rating filter value
    const [editId, setEditId] = useState(null); // Stores the id of the review being edited (null if not editing)

    // GET /movies - Fetch all reviews from the backend
    const handleFetchReviews = () => {
        axios.get('http://localhost:8080/api/movies')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching movie reviews:', error);
            });
    };

    // POST /movies or PUT /movies/:id - Add or update a review
    const handleAddOrUpdateReview = () => {
        const newReview = {
            // Create a new review object with the input data
            movieName,
            review,
            rating,
        };

        if (editId) {
            // if id already exists, Update existing review
            axios.put(`http://localhost:8080/api/movies/${editId}`, newReview)
                .then(() => {
                    console.log('Movie review updated:', editId);
                    handleFetchReviews();
                    handleResetForm();
                })
                .catch((error) => {
                    console.error('Error updating movie review:', error);
                });
        } else {
            // if there is no saved id, create a new one
            axios.post('http://localhost:8080/api/movies', newReview)
                .then((response) => {
                    console.log('Movie review added:', response.data);
                    handleFetchReviews();
                    handleResetForm();
                })
                .catch((error) => {
                    console.error('Error adding movie review:', error);
                });
        }
    };

    // DELETE /movies/:id - Delete a review
    const handleDeleteReview = (id) => {
        axios.delete(`http://localhost:8080/api/movies/${id}`)
            .then(() => {
                console.log('Movie review deleted:', id);
                handleFetchReviews();
            })
            .catch((error) => {
                console.error('Error deleting movie review:', error);
            });
    };

    const handleEditReview = (review) => {
        setMovieName(review.movieName);
        setReview(review.review);
        setRating(review.rating);
        setEditId(review.id);
    };

    //reset the form back to default values
    const handleResetForm = () => {
        setMovieName('');
        setReview('');
        setRating(1);
        setEditId(null);
    };

    //for filtering reviews by rating
    const handleFilterChange = (e) => {
        // Set the filterRating state to the selected value
        // for example, if the user selects '5 Stars', set filterRating to '5'
        setFilterRating(e.target.value);
    };

    //filter reviews based on rating
    const filteredReviews = reviews.filter((r) => {
        if (filterRating === 'All') return true;
        //show selected rating
        return r.rating === parseInt(filterRating);
    });

    return (
        <Layout>
            <div className="movies-page">
                <div className="description-bubble">
                    <h2><span role="img" aria-label="movie-icon">🎥</span> Movies </h2>
                    <p>My harsh (but not so impactful) movie reviews. I can guarantee 5-star movies are objectively good tho! <span role="img" aria-label="popcorn">🍿˙✧˖°. 📽.ᐟ ༘ ⋆｡°🎬⇄ ◀ 𓊕 ▶ ↻˚˖👾⋆˚☆˖°👾𓍢ִ໋`🌿:✧˚.📷⋆𖧧⋆˖°𓇼🌊⋆🐚🫧</span></p>
                </div>

                {/* Review SECTION */}
                <div className="reviews-section">
                    <h2>Reviews</h2>
                    <button className="button" onClick={handleFetchReviews}>See Reviews</button>

                    <div className="filter-section">
                        <label>Filter by Rating: </label>
                        {/* dropdown for the filtered search */}
                        <select value={filterRating} onChange={handleFilterChange}>
                            <option value="All">All</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>

                    {/* fetched reviews: */}
                    <div className="reviews-list">
                        {filteredReviews.map((r, index) => (
                            <div key={index} className="review-item"> {/* Display each review item */}
                                <h3>{r.movieName}</h3>
                                <p>{r.review}</p>
                                <div className="stars">
                                    {'★'.repeat(r.rating)}  {/* Display filled stars based on rating */}
                                    {'☆'.repeat(5 - r.rating)} {/* Display unfilled stars based on rating */}
                                </div>

                                {/* EDIT OR DELETE the review */}
                                <div className="review-buttons">
                                    <button className="button delete-button" onClick={() => handleDeleteReview(r.id)}>Delete</button>
                                    <button className="button update-button" onClick={() => handleEditReview(r)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section to Add review */}
                <div className="add-review-section">
                    <h2>{editId ? 'Update Review' : 'Add a Review'}</h2>
                    <input
                        type="text"
                        placeholder="Enter movie name..."
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        className="input-movie-name"
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
                            Cancel {/* Button to cancel editing */}
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Movies;
