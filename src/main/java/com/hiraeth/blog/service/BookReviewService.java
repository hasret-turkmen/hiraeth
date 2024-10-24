package com.hiraeth.blog.service;

import com.hiraeth.blog.model.BookReview;
import com.hiraeth.blog.repository.BookReviewRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookReviewService {

    private final BookReviewRepository bookReviewRepository;

    public BookReviewService(@Qualifier("book") BookReviewRepository bookReviewRepository) {
        this.bookReviewRepository = bookReviewRepository;
    }

    public List<BookReview> getAllReviews() {
        return bookReviewRepository.findAll();
    }

    public Optional<BookReview> getReviewById(Long id) {
        return bookReviewRepository.findById(id);
    }

    public BookReview addReview(BookReview bookReview) {
        bookReview.setReviewDate(LocalDate.now());
        return bookReviewRepository.save(bookReview);
    }

    public BookReview updateReview(Long id, BookReview bookReview) {
        Optional<BookReview> existingReview = bookReviewRepository.findById(id);
        if (existingReview.isPresent()) {
            BookReview reviewToUpdate = existingReview.get();
            reviewToUpdate.setBookName(bookReview.getBookName());
            reviewToUpdate.setReview(bookReview.getReview());
            reviewToUpdate.setRating(bookReview.getRating());
            return bookReviewRepository.save(reviewToUpdate);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }

    public void deleteReview(Long id) {
        bookReviewRepository.deleteById(id);
    }
}
