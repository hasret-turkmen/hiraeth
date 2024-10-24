import React, { useState } from 'react'; // Import React and useState hook for managing state in the component
import axios from 'axios'; // Import axios for making HTTP requests
import Layout from './Layout'; // Import Layout component to maintain consistent page structure
import './Commons.css'; // Import CSS for styling the Books component

const Books = () => {
    // State hooks for storing form inputs, reviews list, and edit status
    const [bookName, setBookName] = useState(''); // Stores the book name
    const [review, setReview] = useState(''); // Stores the review text
    const [rating, setRating] = useState(1); // Stores the rating value
    const [reviews, setReviews] = useState([]); // Stores the list of reviews fetched from the backend
    const [filterRating, setFilterRating] = useState('All'); // Stores the rating filter value
    const [editId, setEditId] = useState(null); // Stores the id of the review being edited (null if not editing)

    // Function to fetch reviews from the backend
    const handleFetchReviews = () => {
        axios.get('http://localhost:8080/api/books') // Send GET request to backend API
            .then((response) => {
                setReviews(response.data); // Update reviews state with response data
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error); // Log any errors
            });
    };

    // Function to add a new review or update an existing one
    const handleAddOrUpdateReview = () => {
        const newReview = {
            bookName, // Book name from state
            review, // Review text from state
            rating, // Rating from state
        };

        if (editId) {
            // If editId is set, update an existing review
            axios.put(`http://localhost:8080/api/books/${editId}`, newReview) // Send PUT request to update review
                .then(() => {
                    console.log('Review updated:', editId); // Log successful update
                    handleFetchReviews(); // Fetch updated list of reviews
                    handleResetForm(); // Reset the form
                })
                .catch((error) => {
                    console.error('Error updating review:', error); // Log any errors
                });
        } else {
            // If editId is not set, add a new review
            axios.post('http://localhost:8080/api/books', newReview) // Send POST request to add review
                .then((response) => {
                    console.log('Review added:', response.data); // Log successful addition
                    handleFetchReviews(); // Fetch updated list of reviews
                    handleResetForm(); // Reset the form
                })
                .catch((error) => {
                    console.error('Error adding review:', error); // Log any errors
                });
        }
    };

    // Function to delete a review
    const handleDeleteReview = (id) => {
        axios.delete(`http://localhost:8080/api/books/${id}`) // Send DELETE request to backend
            .then(() => {
                console.log('Review deleted:', id); // Log successful deletion
                handleFetchReviews(); // Fetch updated list of reviews
            })
            .catch((error) => {
                console.error('Error deleting review:', error); // Log any errors
            });
    };

    // Function to populate the form with review details for editing
    const handleEditReview = (review) => {
        setBookName(review.bookName); // Set book name to edit
        setReview(review.review); // Set review text to edit
        setRating(review.rating); // Set rating to edit
        setEditId(review.id); // Set editId to identify which review is being edited
    };

    // Function to reset the form fields
    const handleResetForm = () => {
        setBookName(''); // Clear book name
        setReview(''); // Clear review text
        setRating(1); // Reset rating to 1
        setEditId(null); // Clear editId (stop editing)
    };

    // Function to handle changes in filter rating dropdown
    const handleFilterChange = (e) => {
        setFilterRating(e.target.value); // Update filterRating state with selected value
    };

    // Function to filter reviews based on selected rating
    const filteredReviews = reviews.filter((r) => {
        if (filterRating === 'All') return true; // If 'All' is selected, show all reviews
        return r.rating === parseInt(filterRating); // Show reviews that match selected rating
    });

    return (
        <Layout> {/* Layout component to maintain consistent page layout */}
            <div className="books-page">
                <div className="description-bubble">
                    <h2><span role="img" aria-label="book-icon">📚</span> Books </h2>
                    <p>Mostly consists of Classics, Fantasy, Sci-Fi and Crime novels. I love giving book advices, hope you like them!  <span role="img" aria-label="popcorn">🍃🌙🪞🪷✨📜˚˖𓍢ִ໋🌷͙֒✧˚.🎀༘⋆✩°𓏲⋆🌿. ⋆⸜ 🍵✮˚༄˖°.☕️.ೃ࿔📚*:･🍄ﾟ✧🌾₊˚ʚ 🌿˚✧ ﾟ.🌻🌱ﾟ🌼</span></p>
                </div>


                {/* Section to See Reviews */}
                <div className="reviews-section">
                    <h2>Reviews</h2>
                    <button className="button" onClick={handleFetchReviews}>See Reviews</button>
                    {/* Button to fetch all reviews */}

                    {/* Filter section */}
                    <div className="filter-section">
                        <label>Filter by Rating: </label>
                        <select value={filterRating} onChange={handleFilterChange}> {/* Dropdown to filter reviews by rating */}
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
                                {/* Buttons to edit or delete review */}
                                <div className="review-buttons">
                                    <button className="button delete-button" onClick={() => handleDeleteReview(r.id)}>Delete</button> {/* Delete button */}
                                    <button className="button update-button" onClick={() => handleEditReview(r)}>Edit</button> {/* Edit button */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section to Add or Update a Review */}
                <div className="add-review-section">
                    <h2>{editId ? 'Update Review' : 'Add a Review'}</h2> {/* Title changes based on edit or add mode */}
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)} // Update book name state on change
                        className="input-book-name"
                    />
                    <textarea
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)} // Update review text state on change
                        className="review-textarea"
                    />
                    <div>
                        <label>Rating: </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))} // Update rating state on change
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

export default Books; // Export the Books component
