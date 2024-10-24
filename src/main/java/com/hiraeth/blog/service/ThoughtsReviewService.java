package com.hiraeth.blog.service;

import com.hiraeth.blog.model.Thoughts;
import com.hiraeth.blog.repository.ThoughtRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ThoughtsReviewService {

    private ThoughtRepository thoughtRepository;

    public List<Thoughts> getAllReviews() {
        return thoughtRepository.findAll();
    }

    public Optional<Thoughts> getReviewById(Long id) {
        return thoughtRepository.findById(id);
    }

    public Thoughts addReview(Thoughts review) {
        review.setReviewDate(LocalDate.now());
        return thoughtRepository.save(review);
    }

    public Thoughts updateReview(Long id, Thoughts updatedReview) {
        return thoughtRepository.findById(id).map(review -> {
            review.setTitle(updatedReview.getTitle());
            return thoughtRepository.save(review);
        }).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public Thoughts createReview(Thoughts review) {
        return thoughtRepository.save(review);
    }

    public void deleteReview(Long id) {
        thoughtRepository.deleteById(id);
    }
}

