package com.astrteach.repository;

import com.astrteach.entity.ExamPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExamPaperRepository extends JpaRepository<ExamPaper, UUID> {
    Page<ExamPaper> findByTeacherId(UUID teacherId, Pageable pageable);
    Page<ExamPaper> findByStatus(String status, Pageable pageable);
}
