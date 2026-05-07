package com.astrteach.repository;

import com.astrteach.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Page<Question> findBySubjectIdAndType(UUID subjectId, String type, Pageable pageable);
    Page<Question> findBySubjectId(UUID subjectId, Pageable pageable);
    Page<Question> findByType(String type, Pageable pageable);
    Page<Question> findByDifficulty(String difficulty, Pageable pageable);
    Page<Question> findBySubjectIdAndGradeId(UUID subjectId, UUID gradeId, Pageable pageable);
    long countBySubjectId(UUID subjectId);
}
