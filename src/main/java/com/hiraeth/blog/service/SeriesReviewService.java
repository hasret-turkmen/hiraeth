package com.hiraeth.blog.service;

import com.hiraeth.blog.model.SeriesReview;
import com.hiraeth.blog.repository.SeriesReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SeriesReviewService {

    private SeriesReviewRepository seriesReviewRepository;

    public SeriesReviewService(SeriesReviewRepository seriesReviewRepository) {
        this.seriesReviewRepository = seriesReviewRepository;
    }
    public List<SeriesReview> getAllReviews() {
        return seriesReviewRepository.findAll();
    }

    public Optional<SeriesReview> getReviewById(Long id) {
        return seriesReviewRepository.findById(id);
    }

    public SeriesReview addReview(SeriesReview review) {
        review.setReviewDate(LocalDate.now());
        return seriesReviewRepository.save(review);
    }

    public SeriesReview updateReview(Long id, SeriesReview updatedReview) {
        return seriesReviewRepository.findById(id).map(review -> {
            review.setSeriesName(updatedReview.getSeriesName());
            review.setReview(updatedReview.getReview());
            review.setRating(updatedReview.getRating());
            return seriesReviewRepository.save(review);
        }).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public void deleteReview(Long id) {
        seriesReviewRepository.deleteById(id);
    }
}

