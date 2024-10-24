package com.hiraeth.blog.repository;

import com.hiraeth.blog.model.MovieReview;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("movie")
public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {
}

