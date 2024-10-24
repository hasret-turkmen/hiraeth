package com.hiraeth.blog.repository;

import com.hiraeth.blog.model.BookReview;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("book")
public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
}
