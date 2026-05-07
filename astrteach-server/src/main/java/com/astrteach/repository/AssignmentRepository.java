package com.astrteach.repository;

import com.astrteach.entity.Assignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
    Page<Assignment> findByTeacherId(UUID teacherId, Pageable pageable);
    Page<Assignment> findByClassEntityId(UUID classId, Pageable pageable);
}
