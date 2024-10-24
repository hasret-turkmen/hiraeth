package com.hiraeth.blog.service;

import com.hiraeth.blog.model.MovieReview;
import com.hiraeth.blog.repository.BookReviewRepository;
import com.hiraeth.blog.repository.MovieReviewRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovieReviewService {

    private MovieReviewRepository movieReviewRepository;

    public MovieReviewService(@Qualifier("movie") MovieReviewRepository movieReviewRepository) {
        this.movieReviewRepository = movieReviewRepository;
    }

    public List<MovieReview> getAllReviews() {
        return movieReviewRepository.findAll();
    }

    public Optional<MovieReview> getReviewById(Long id) {
        return movieReviewRepository.findById(id);
    }

    public MovieReview addReview(MovieReview review) {
        review.setReviewDate(LocalDate.now());
        return movieReviewRepository.save(review);
    }

    public MovieReview updateReview(Long id, MovieReview updatedReview) {
        return movieReviewRepository.findById(id).map(review -> {
            review.setMovieName(updatedReview.getMovieName());
            review.setReview(updatedReview.getReview());
            review.setRating(updatedReview.getRating());
            return movieReviewRepository.save(review);
        }).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public void deleteReview(Long id) {
        movieReviewRepository.deleteById(id);
    }
}

