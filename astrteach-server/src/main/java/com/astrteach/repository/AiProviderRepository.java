package com.astrteach.repository;

import com.astrteach.entity.AiProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AiProviderRepository extends JpaRepository<AiProvider, UUID> {
    Page<AiProvider> findBySchoolId(UUID schoolId, Pageable pageable);
    Page<AiProvider> findByProviderType(String providerType, Pageable pageable);
    Page<AiProvider> findBySchoolIdAndProviderType(UUID schoolId, String providerType, Pageable pageable);
    boolean existsByNameAndSchoolId(String name, UUID schoolId);
}
