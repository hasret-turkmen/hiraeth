package com.hiraeth.blog.controller;

import com.hiraeth.blog.model.MovieReview;
import com.hiraeth.blog.requests.MovieReviewRequest;
import com.hiraeth.blog.service.MovieReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieReviewController {

    private MovieReviewService movieReviewService;

    public MovieReviewController(MovieReviewService movieReviewService) {
        this.movieReviewService = movieReviewService;
    }

    @GetMapping
    public List<MovieReview> getAllReviews() {
        return movieReviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieReview> getReviewById(@PathVariable Long id) {
        return movieReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MovieReview> createReview(@RequestBody MovieReviewRequest movieReviewRequest) {
        MovieReview movieReview = new MovieReview();
        movieReview.setMovieName(movieReviewRequest.getMovieName());
        movieReview.setReview(movieReviewRequest.getReview());
        movieReview.setRating(movieReviewRequest.getRating());
        movieReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(movieReviewService.addReview(movieReview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieReview> updateReview(@PathVariable Long id, @RequestBody MovieReviewRequest movieReviewRequest) {
        MovieReview updatedReview = new MovieReview();
        updatedReview.setMovieName(movieReviewRequest.getMovieName());
        updatedReview.setReview(movieReviewRequest.getReview());
        updatedReview.setRating(movieReviewRequest.getRating());
        updatedReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(movieReviewService.updateReview(id, updatedReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        movieReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
