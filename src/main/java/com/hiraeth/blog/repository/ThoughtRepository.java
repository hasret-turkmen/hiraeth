package com.hiraeth.blog.repository;
import com.hiraeth.blog.model.Thoughts;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("thought")
public interface ThoughtRepository extends JpaRepository<Thoughts, Long> {
}

