package com.hiraeth.blog.controller;

import com.hiraeth.blog.model.SeriesReview;
import com.hiraeth.blog.requests.SeriesReviewRequest;
import com.hiraeth.blog.service.SeriesReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/series")
public class SeriesReviewController {

    private SeriesReviewService seriesReviewService;

    public SeriesReviewController(SeriesReviewService seriesReviewService) {
        this.seriesReviewService = seriesReviewService;
    }

    @GetMapping
    public List<SeriesReview> getAllReviews() {
        return seriesReviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeriesReview> getReviewById(@PathVariable Long id) {
        return seriesReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SeriesReview> createReview(@RequestBody SeriesReviewRequest seriesReviewRequest) {
        SeriesReview seriesReview = new SeriesReview();
        seriesReview.setSeriesName(seriesReviewRequest.getSeriesName());
        seriesReview.setReview(seriesReviewRequest.getReview());
        seriesReview.setRating(seriesReviewRequest.getRating());
        seriesReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(seriesReviewService.addReview(seriesReview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeriesReview> updateReview(@PathVariable Long id, @RequestBody SeriesReviewRequest review) {
        SeriesReview seriesReview = new SeriesReview();
        seriesReview.setSeriesName(review.getSeriesName());
        seriesReview.setReview(review.getReview());
        seriesReview.setRating(review.getRating());
        seriesReview.setReviewDate(LocalDate.now());
        return ResponseEntity.ok(seriesReviewService.updateReview(id, seriesReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        seriesReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
