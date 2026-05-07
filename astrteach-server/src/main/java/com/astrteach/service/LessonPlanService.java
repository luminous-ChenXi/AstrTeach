package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.LessonPlanRequest;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.Grade;
import com.astrteach.entity.LessonPlan;
import com.astrteach.entity.Subject;
import com.astrteach.entity.User;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.GradeRepository;
import com.astrteach.repository.LessonPlanRepository;
import com.astrteach.repository.SubjectRepository;
import com.astrteach.repository.UserRepository;
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
public class LessonPlanService {

    private final LessonPlanRepository lessonPlanRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final GradeRepository gradeRepository;

    public ApiResponse<PageResponse<LessonPlan>> listLessonPlans(UUID teacherId, String status, int page, int size) {
        Page<LessonPlan> planPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (teacherId != null && status != null) {
            planPage = lessonPlanRepository.findByTeacherIdAndStatus(teacherId, status, pageRequest);
        } else if (teacherId != null) {
            planPage = lessonPlanRepository.findByTeacherId(teacherId, pageRequest);
        } else if (status != null) {
            planPage = lessonPlanRepository.findByStatus(status, pageRequest);
        } else {
            planPage = lessonPlanRepository.findAll(pageRequest);
        }

        var items = planPage.getContent().stream().map(this::toVO).toList();
        PageResponse<LessonPlan> response = new PageResponse<>(
                items, planPage.getTotalElements(), page, size, planPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<LessonPlan> getLessonPlan(UUID id) {
        LessonPlan plan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("教案不存在"));
        return ApiResponse.success(plan);
    }

    @Transactional
    public ApiResponse<LessonPlan> createLessonPlan(UUID teacherId, LessonPlanRequest request) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> BusinessException.notFound("教师不存在"));
        Subject subject = subjectRepository.findById(UUID.fromString(request.getSubjectId()))
                .orElseThrow(() -> BusinessException.notFound("学科不存在"));

        LessonPlan plan = LessonPlan.builder()
                .title(request.getTitle())
                .teacher(teacher)
                .subject(subject)
                .classType(request.getClassType())
                .durationMinutes(request.getDurationMinutes())
                .objectives(request.getObjectives())
                .keyPoints(request.getKeyPoints())
                .teachingProcess(request.getTeachingProcess())
                .boardDesign(request.getBoardDesign())
                .homeworkDesign(request.getHomeworkDesign())
                .source("manual")
                .version(1)
                .status("draft")
                .build();

        if (request.getGradeId() != null) {
            Grade grade = gradeRepository.findById(UUID.fromString(request.getGradeId()))
                    .orElseThrow(() -> BusinessException.notFound("年级不存在"));
            plan.setGrade(grade);
        }

        plan = lessonPlanRepository.save(plan);
        return ApiResponse.success("创建成功", plan);
    }

    @Transactional
    public ApiResponse<LessonPlan> updateLessonPlan(UUID id, LessonPlanRequest request) {
        LessonPlan plan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("教案不存在"));

        if (request.getTitle() != null) plan.setTitle(request.getTitle());
        if (request.getClassType() != null) plan.setClassType(request.getClassType());
        if (request.getDurationMinutes() != null) plan.setDurationMinutes(request.getDurationMinutes());
        if (request.getObjectives() != null) plan.setObjectives(request.getObjectives());
        if (request.getKeyPoints() != null) plan.setKeyPoints(request.getKeyPoints());
        if (request.getTeachingProcess() != null) plan.setTeachingProcess(request.getTeachingProcess());
        if (request.getBoardDesign() != null) plan.setBoardDesign(request.getBoardDesign());
        if (request.getHomeworkDesign() != null) plan.setHomeworkDesign(request.getHomeworkDesign());

        plan.setVersion(plan.getVersion() + 1);
        lessonPlanRepository.save(plan);
        return ApiResponse.success("更新成功", plan);
    }

    @Transactional
    public ApiResponse<Void> deleteLessonPlan(UUID id) {
        if (!lessonPlanRepository.existsById(id)) {
            throw BusinessException.notFound("教案不存在");
        }
        lessonPlanRepository.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    private LessonPlan toVO(LessonPlan plan) {
        plan.getTeacher().getUsername();
        plan.getSubject().getName();
        return plan;
    }
}
