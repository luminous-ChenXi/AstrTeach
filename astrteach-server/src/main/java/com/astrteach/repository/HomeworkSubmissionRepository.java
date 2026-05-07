package com.astrteach.repository;

import com.astrteach.entity.HomeworkSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HomeworkSubmissionRepository extends JpaRepository<HomeworkSubmission, UUID> {
    List<HomeworkSubmission> findByAssignmentId(UUID assignmentId);
    List<HomeworkSubmission> findByAssignmentIdAndGradingStatus(UUID assignmentId, String gradingStatus);
    List<HomeworkSubmission> findByStudentIdOrderBySubmittedAtDesc(UUID studentId);
}
