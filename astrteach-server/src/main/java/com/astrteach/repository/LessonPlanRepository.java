package com.astrteach.repository;

import com.astrteach.entity.LessonPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LessonPlanRepository extends JpaRepository<LessonPlan, UUID> {
    Page<LessonPlan> findByTeacherId(UUID teacherId, Pageable pageable);
    Page<LessonPlan> findByTeacherIdAndStatus(UUID teacherId, String status, Pageable pageable);
    Page<LessonPlan> findByStatus(String status, Pageable pageable);
}
