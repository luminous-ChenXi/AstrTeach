package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.ExamPaperRequest;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class ExamPaperService {

    private final ExamPaperRepository examPaperRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final GradeRepository gradeRepository;
    private final ClassEntityRepository classEntityRepository;

    public ApiResponse<PageResponse<ExamPaper>> listExamPapers(UUID teacherId, String status, int page, int size) {
        Page<ExamPaper> paperPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (teacherId != null) {
            paperPage = examPaperRepository.findByTeacherId(teacherId, pageRequest);
        } else if (status != null) {
            paperPage = examPaperRepository.findByStatus(status, pageRequest);
        } else {
            paperPage = examPaperRepository.findAll(pageRequest);
        }

        var items = paperPage.getContent().stream().map(this::toVO).toList();
        PageResponse<ExamPaper> response = new PageResponse<>(
                items, paperPage.getTotalElements(), page, size, paperPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<ExamPaper> getExamPaper(UUID id) {
        ExamPaper paper = examPaperRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("试卷不存在"));
        return ApiResponse.success(paper);
    }

    @Transactional
    public ApiResponse<ExamPaper> createExamPaper(UUID teacherId, ExamPaperRequest request) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> BusinessException.notFound("教师不存在"));

        ExamPaper paper = ExamPaper.builder()
                .title(request.getTitle())
                .teacher(teacher)
                .totalScore(BigDecimal.valueOf(request.getTotalScore()))
                .durationMinutes(request.getDurationMinutes())
                .sections(request.getSections())
                .isAdaptive(request.getIsAdaptive() != null ? request.getIsAdaptive() : false)
                .status("draft")
                .build();

        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(UUID.fromString(request.getSubjectId()))
                    .orElseThrow(() -> BusinessException.notFound("学科不存在"));
            paper.setSubject(subject);
        }

        if (request.getGradeId() != null) {
            Grade grade = gradeRepository.findById(UUID.fromString(request.getGradeId()))
                    .orElseThrow(() -> BusinessException.notFound("年级不存在"));
            paper.setGrade(grade);
        }

        if (request.getClassId() != null) {
            ClassEntity classEntity = classEntityRepository.findById(UUID.fromString(request.getClassId()))
                    .orElseThrow(() -> BusinessException.notFound("班级不存在"));
            paper.setClassEntity(classEntity);
        }

        paper = examPaperRepository.save(paper);
        return ApiResponse.success("创建成功", paper);
    }

    @Transactional
    public ApiResponse<Void> deleteExamPaper(UUID id) {
        if (!examPaperRepository.existsById(id)) {
            throw BusinessException.notFound("试卷不存在");
        }
        examPaperRepository.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    private ExamPaper toVO(ExamPaper p) {
        p.getTeacher().getUsername();
        if (p.getSubject() != null) p.getSubject().getName();
        return p;
    }
}
