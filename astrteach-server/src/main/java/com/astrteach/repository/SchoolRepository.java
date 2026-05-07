package com.astrteach.repository;

import com.astrteach.entity.School;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID> {
    boolean existsByCode(String code);
    Page<School> findByProvince(String province, Pageable pageable);
    Page<School> findByProvinceAndCity(String province, String city, Pageable pageable);
}
