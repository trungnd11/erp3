package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    @EntityGraph(attributePaths = {"childrens"})
    public Page<Comment> findByTaskIdAndDelFlgIsFalse(Long taskId, Pageable pageable);

    @EntityGraph(attributePaths = {"childrens"})
    Optional<Comment> findByIdAndDelFlgIsFalse(Long id);
}
