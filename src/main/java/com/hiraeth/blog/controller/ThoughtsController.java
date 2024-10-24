package com.hiraeth.blog.controller;

import com.hiraeth.blog.model.Thoughts;
import com.hiraeth.blog.requests.ThoughtsRequest;
import com.hiraeth.blog.service.ThoughtsReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/thoughts")
public class ThoughtsController {

    private ThoughtsReviewService thoughtsReviewService;

    public ThoughtsController(ThoughtsReviewService thoughtsReviewService) {
        this.thoughtsReviewService = thoughtsReviewService;
    }

    @GetMapping
    public List<Thoughts> getAllReviews() {
        return thoughtsReviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Thoughts> getReviewById(@PathVariable Long id) {
        return thoughtsReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Thoughts> createReview(@RequestBody ThoughtsRequest review) {
        Thoughts thoughts = new Thoughts();
        thoughts.setContent(review.getContent());
        thoughts.setTitle(review.getTitle());
        thoughts.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(thoughtsReviewService.createReview(thoughts));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Thoughts> updateReview(@PathVariable Long id, @RequestBody ThoughtsRequest review) {
        Thoughts thoughts = new Thoughts();
        thoughts.setContent(review.getContent());
        thoughts.setTitle(review.getTitle());
        thoughts.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(thoughtsReviewService.updateReview(id, thoughts));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        thoughtsReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
