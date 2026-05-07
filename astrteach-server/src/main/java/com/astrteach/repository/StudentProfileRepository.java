package com.astrteach.repository;

import com.astrteach.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, UUID> {
    Optional<StudentProfile> findByStudentId(UUID studentId);
    java.util.List<StudentProfile> findByClassEntityId(UUID classId);
}
