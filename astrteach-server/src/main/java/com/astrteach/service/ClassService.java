package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.ClassDTO;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.ClassEntity;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.ClassEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class ClassService {

    private final ClassEntityRepository classEntityRepository;

    public ApiResponse<PageResponse<ClassDTO>> listClasses(UUID schoolId, UUID teacherId, int page, int size) {
        Page<ClassEntity> classPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (schoolId != null) {
            var classes = classEntityRepository.findBySchoolId(schoolId);
            var items = classes.stream().map(this::toDTO).toList();
            PageResponse<ClassDTO> response = new PageResponse<>(items, items.size(), page, size, 1);
            return ApiResponse.success(response);
        } else if (teacherId != null) {
            var classes = classEntityRepository.findByHeadTeacherId(teacherId);
            var items = classes.stream().map(this::toDTO).toList();
            PageResponse<ClassDTO> response = new PageResponse<>(items, items.size(), page, size, 1);
            return ApiResponse.success(response);
        } else {
            classPage = classEntityRepository.findAll(pageRequest);
            var items = classPage.getContent().stream().map(this::toDTO).toList();
            PageResponse<ClassDTO> response = new PageResponse<>(
                    items, classPage.getTotalElements(), page, size, classPage.getTotalPages());
            return ApiResponse.success(response);
        }
    }

    public ApiResponse<ClassDTO> getClass(UUID id) {
        ClassEntity classEntity = classEntityRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("班级不存在"));
        return ApiResponse.success(toDTO(classEntity));
    }

    private ClassDTO toDTO(ClassEntity c) {
        return ClassDTO.builder()
                .id(c.getId().toString())
                .name(c.getName())
                .schoolId(c.getSchool().getId().toString())
                .schoolName(c.getSchool().getName())
                .gradeId(c.getGrade() != null ? c.getGrade().getId().toString() : null)
                .gradeName(c.getGrade() != null ? c.getGrade().getName() : null)
                .headTeacherId(c.getHeadTeacher() != null ? c.getHeadTeacher().getId().toString() : null)
                .headTeacherName(c.getHeadTeacher() != null ? c.getHeadTeacher().getRealName() : null)
                .classType(c.getClassType())
                .academicYear(c.getAcademicYear())
                .status(c.getStatus())
                .createdAt(c.getCreatedAt() != null ? c.getCreatedAt().toString() : null)
                .build();
    }
}
