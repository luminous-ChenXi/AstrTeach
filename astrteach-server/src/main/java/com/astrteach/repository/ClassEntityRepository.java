package com.astrteach.repository;

import com.astrteach.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClassEntityRepository extends JpaRepository<ClassEntity, UUID> {
    List<ClassEntity> findBySchoolId(UUID schoolId);
    List<ClassEntity> findByHeadTeacherId(UUID teacherId);
}
