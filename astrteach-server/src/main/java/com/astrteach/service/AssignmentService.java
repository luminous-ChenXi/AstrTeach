package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.AssignmentRequest;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.*;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    private final ClassEntityRepository classEntityRepository;
    private final SubjectRepository subjectRepository;
    private final LessonPlanRepository lessonPlanRepository;

    public ApiResponse<PageResponse<Assignment>> listAssignments(UUID teacherId, UUID classId, String status, int page, int size) {
        Page<Assignment> assignmentPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (teacherId != null) {
            assignmentPage = assignmentRepository.findByTeacherId(teacherId, pageRequest);
        } else if (classId != null) {
            assignmentPage = assignmentRepository.findByClassEntityId(classId, pageRequest);
        } else {
            assignmentPage = assignmentRepository.findAll(pageRequest);
        }

        var items = assignmentPage.getContent().stream().map(this::toVO).toList();
        PageResponse<Assignment> response = new PageResponse<>(
                items, assignmentPage.getTotalElements(), page, size, assignmentPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<Assignment> getAssignment(UUID id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("作业不存在"));
        return ApiResponse.success(assignment);
    }

    @Transactional
    public ApiResponse<Assignment> createAssignment(UUID teacherId, AssignmentRequest request) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> BusinessException.notFound("教师不存在"));
        ClassEntity classEntity = classEntityRepository.findById(UUID.fromString(request.getClassId()))
                .orElseThrow(() -> BusinessException.notFound("班级不存在"));
        Subject subject = subjectRepository.findById(UUID.fromString(request.getSubjectId()))
                .orElseThrow(() -> BusinessException.notFound("学科不存在"));

        Assignment assignment = Assignment.builder()
                .title(request.getTitle())
                .teacher(teacher)
                .classEntity(classEntity)
                .subject(subject)
                .homeworkType(request.getHomeworkType())
                .questions(request.getQuestions())
                .totalScore(request.getTotalScore() != null ? BigDecimal.valueOf(request.getTotalScore()) : null)
                .deadline(request.getDeadline() != null ? LocalDateTime.parse(request.getDeadline()) : null)
                .status("active")
                .build();

        if (request.getLessonPlanId() != null) {
            LessonPlan lessonPlan = lessonPlanRepository.findById(UUID.fromString(request.getLessonPlanId()))
                    .orElseThrow(() -> BusinessException.notFound("教案不存在"));
            assignment.setLessonPlan(lessonPlan);
        }

        assignment = assignmentRepository.save(assignment);
        return ApiResponse.success("创建成功", assignment);
    }

    @Transactional
    public ApiResponse<Void> deleteAssignment(UUID id) {
        if (!assignmentRepository.existsById(id)) {
            throw BusinessException.notFound("作业不存在");
        }
        assignmentRepository.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    private Assignment toVO(Assignment a) {
        a.getTeacher().getUsername();
        a.getSubject().getName();
        a.getClassEntity().getName();
        return a;
    }
}
