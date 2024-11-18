package com.hiraeth.blog.controller;

import com.hiraeth.blog.model.BookReview;
import com.hiraeth.blog.requests.BookReviewRequest;
import com.hiraeth.blog.service.BookReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookReviewController {

    private final BookReviewService bookReviewService;

    public BookReviewController(BookReviewService bookReviewService) {
        this.bookReviewService = bookReviewService;
    }

    //returns all reviews
    //local testing endpoint with postman: GET http://localhost:8080/api/books
    @GetMapping
    public List<BookReview> getAllReviews() {
        return bookReviewService.getAllReviews();
    }

    //local testing endpoint with postman: GET http://localhost:8080/api/books/{id}
    @GetMapping("/{id}")
    public ResponseEntity<BookReview> getReviewById(@PathVariable Long id) {
        return bookReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //local testing endpoint with postman: POST http://localhost:8080/api/books
    /*
    body: {
        "bookName": "Battle Royale",
        "review": "My favorite book! Amazing!",
        "rating": 5 }
    */
    @PostMapping
    public ResponseEntity<BookReview> createReview(@RequestBody BookReviewRequest bookReviewRequest) {
        BookReview bookReview = new BookReview();
        bookReview.setBookName(bookReviewRequest.getBookName());
        bookReview.setReview(bookReviewRequest.getReview());
        bookReview.setRating(bookReviewRequest.getRating());
        bookReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(bookReviewService.addReview(bookReview));
    }

    //local testing endpoint with postman: PUT http://localhost:8080/api/books/{id}
    /*
    body: {
        "bookName": "Battle Royale",
        "review": "My favorite book! Amazing!",
        "rating": 5 }
    */
    @PutMapping("/{id}")
    public ResponseEntity<BookReview> updateReview(@PathVariable Long id, @RequestBody BookReviewRequest bookReviewRequest) {
        BookReview updatedReview = new BookReview();
        updatedReview.setBookName(bookReviewRequest.getBookName());
        updatedReview.setReview(bookReviewRequest.getReview());
        updatedReview.setRating(bookReviewRequest.getRating());
        updatedReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(bookReviewService.updateReview(id, updatedReview));
    }

    //local testing endpoint with postman: DELETE http://localhost:8080/api/books/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        bookReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
