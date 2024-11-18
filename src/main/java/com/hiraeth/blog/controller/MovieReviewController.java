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

    //returns all reviews
    //local testing endpoint with postman: GET http://localhost:8080/api/movies
    @GetMapping
    public List<MovieReview> getAllReviews() {
        return movieReviewService.getAllReviews();
    }

    //local testing endpoint with postman: GET http://localhost:8080/api/movies/3
    @GetMapping("/{id}")
    public ResponseEntity<MovieReview> getReviewById(@PathVariable Long id) {
        return movieReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //local testing endpoint with postman: POST http://localhost:8080/api/movies
    /*
    body: {
        "movieName": "The Substance",
        "review": "My favorite movie! Amazing!",
        "rating": 5 }
    */
    @PostMapping
    public ResponseEntity<MovieReview> createReview(@RequestBody MovieReviewRequest movieReviewRequest) {
        MovieReview movieReview = new MovieReview();
        movieReview.setMovieName(movieReviewRequest.getMovieName());
        movieReview.setReview(movieReviewRequest.getReview());
        movieReview.setRating(movieReviewRequest.getRating());
        movieReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(movieReviewService.addReview(movieReview));
    }

    //local testing endpoint with postman: PUT http://localhost:8080/api/movies
    /*
    body: {
        "movieName": "The Substance",
        "review": "My favorite movie! Amazing!",
        "rating": 5 }
    */
    @PutMapping("/{id}")
    public ResponseEntity<MovieReview> updateReview(@PathVariable Long id, @RequestBody MovieReviewRequest movieReviewRequest) {
        MovieReview updatedReview = new MovieReview();
        updatedReview.setMovieName(movieReviewRequest.getMovieName());
        updatedReview.setReview(movieReviewRequest.getReview());
        updatedReview.setRating(movieReviewRequest.getRating());
        updatedReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(movieReviewService.updateReview(id, updatedReview));
    }

    //local testing endpoint with postman: DELETE http://localhost:8080/api/movies/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        movieReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
