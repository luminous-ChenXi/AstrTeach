package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.SchoolDTO;
import com.astrteach.entity.School;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public ApiResponse<PageResponse<SchoolDTO>> listSchools(String province, String city, int page, int size) {
        Page<School> schoolPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (province != null && city != null) {
            schoolPage = schoolRepository.findByProvinceAndCity(province, city, pageRequest);
        } else if (province != null) {
            schoolPage = schoolRepository.findByProvince(province, pageRequest);
        } else {
            schoolPage = schoolRepository.findAll(pageRequest);
        }

        var items = schoolPage.getContent().stream().map(this::toDTO).toList();
        PageResponse<SchoolDTO> response = new PageResponse<>(
                items, schoolPage.getTotalElements(), page, size, schoolPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<SchoolDTO> getSchool(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("学校不存在"));
        return ApiResponse.success(toDTO(school));
    }

    @Transactional
    public ApiResponse<SchoolDTO> createSchool(String name, String code, String province, String city,
                                                String district, String address, String contactName, String contactPhone) {
        if (schoolRepository.existsByCode(code)) {
            throw BusinessException.badRequest("学校编码已存在");
        }

        School school = School.builder()
                .name(name)
                .code(code)
                .province(province)
                .city(city)
                .district(district)
                .address(address)
                .contactName(contactName)
                .contactPhone(contactPhone)
                .status("active")
                .build();

        school = schoolRepository.save(school);
        return ApiResponse.success("创建成功", toDTO(school));
    }

    private SchoolDTO toDTO(School s) {
        return SchoolDTO.builder()
                .id(s.getId().toString())
                .name(s.getName())
                .code(s.getCode())
                .province(s.getProvince())
                .city(s.getCity())
                .district(s.getDistrict())
                .address(s.getAddress())
                .contactName(s.getContactName())
                .contactPhone(s.getContactPhone())
                .status(s.getStatus())
                .createdAt(s.getCreatedAt() != null ? s.getCreatedAt().toString() : null)
                .build();
    }
}
