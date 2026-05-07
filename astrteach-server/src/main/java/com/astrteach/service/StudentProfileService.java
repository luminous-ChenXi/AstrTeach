package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.StudentProfileDTO;
import com.astrteach.entity.StudentProfile;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;

    public ApiResponse<StudentProfileDTO> getProfile(UUID studentId) {
        StudentProfile profile = studentProfileRepository.findByStudentId(studentId)
                .orElseThrow(() -> BusinessException.notFound("学生画像不存在"));
        return ApiResponse.success(toDTO(profile));
    }

    public ApiResponse<PageResponse<StudentProfileDTO>> listByClass(UUID classId, int page, int size) {
        var profiles = studentProfileRepository.findByClassEntityId(classId);
        var items = profiles.stream().map(this::toDTO).toList();
        PageResponse<StudentProfileDTO> response = new PageResponse<>(
                items, items.size(), page, size, 1);
        return ApiResponse.success(response);
    }

    private StudentProfileDTO toDTO(StudentProfile p) {
        return StudentProfileDTO.builder()
                .id(p.getId().toString())
                .studentId(p.getStudent().getId().toString())
                .studentName(p.getStudent().getRealName())
                .classId(p.getClassEntity() != null ? p.getClassEntity().getId().toString() : null)
                .className(p.getClassEntity() != null ? p.getClassEntity().getName() : null)
                .overallMastery(p.getOverallMastery() != null ? p.getOverallMastery().doubleValue() : null)
                .level(p.getLevel())
                .learningStyle(p.getLearningStyle())
                .studyTimeTotal(p.getStudyTimeTotal())
                .homeworkCompletionRate(p.getHomeworkCompletionRate() != null ? p.getHomeworkCompletionRate().doubleValue() : null)
                .avgScore(p.getAvgScore() != null ? p.getAvgScore().doubleValue() : null)
                .strengthPoints(p.getStrengthPoints())
                .weaknessPoints(p.getWeaknessPoints())
                .lastUpdatedAt(p.getLastUpdatedAt() != null ? p.getLastUpdatedAt().toString() : null)
                .createdAt(p.getCreatedAt() != null ? p.getCreatedAt().toString() : null)
                .build();
    }
}
