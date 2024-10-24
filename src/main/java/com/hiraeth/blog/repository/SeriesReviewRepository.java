package com.hiraeth.blog.repository;

import com.hiraeth.blog.model.SeriesReview;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("series")
public interface SeriesReviewRepository extends JpaRepository<SeriesReview, Long> {
}

