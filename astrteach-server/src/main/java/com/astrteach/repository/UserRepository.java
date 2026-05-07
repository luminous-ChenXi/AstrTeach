package com.astrteach.repository;

import com.astrteach.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    Page<User> findBySchoolId(UUID schoolId, Pageable pageable);
    Page<User> findByRole(String role, Pageable pageable);
    Page<User> findBySchoolIdAndRole(UUID schoolId, String role, Pageable pageable);
}
