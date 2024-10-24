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

    @GetMapping
    public List<BookReview> getAllReviews() {
        return bookReviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReview> getReviewById(@PathVariable Long id) {
        return bookReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookReview> createReview(@RequestBody BookReviewRequest bookReviewRequest) {
        BookReview bookReview = new BookReview();
        bookReview.setBookName(bookReviewRequest.getBookName());
        bookReview.setReview(bookReviewRequest.getReview());
        bookReview.setRating(bookReviewRequest.getRating());
        bookReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(bookReviewService.addReview(bookReview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookReview> updateReview(@PathVariable Long id, @RequestBody BookReviewRequest bookReviewRequest) {
        BookReview updatedReview = new BookReview();
        updatedReview.setBookName(bookReviewRequest.getBookName());
        updatedReview.setReview(bookReviewRequest.getReview());
        updatedReview.setRating(bookReviewRequest.getRating());
        updatedReview.setReviewDate(LocalDate.now());

        return ResponseEntity.ok(bookReviewService.updateReview(id, updatedReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        bookReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
