package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.QuestionRequest;
import com.astrteach.entity.Grade;
import com.astrteach.entity.Question;
import com.astrteach.entity.Subject;
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
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SubjectRepository subjectRepository;
    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;

    public ApiResponse<PageResponse<Question>> listQuestions(String subjectId, String type, String difficulty, int page, int size) {
        Page<Question> questionPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (subjectId != null && type != null) {
            questionPage = questionRepository.findBySubjectIdAndType(
                    UUID.fromString(subjectId), type, pageRequest);
        } else if (subjectId != null) {
            questionPage = questionRepository.findBySubjectId(UUID.fromString(subjectId), pageRequest);
        } else if (type != null) {
            questionPage = questionRepository.findByType(type, pageRequest);
        } else if (difficulty != null) {
            questionPage = questionRepository.findByDifficulty(difficulty, pageRequest);
        } else {
            questionPage = questionRepository.findAll(pageRequest);
        }

        var items = questionPage.getContent().stream().map(this::toVO).toList();
        PageResponse<Question> response = new PageResponse<>(
                items, questionPage.getTotalElements(), page, size, questionPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<Question> getQuestion(UUID id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("题目不存在"));
        return ApiResponse.success(question);
    }

    @Transactional
    public ApiResponse<Question> createQuestion(UUID userId, QuestionRequest request) {
        Question question = Question.builder()
                .content(request.getContent())
                .type(request.getType())
                .options(request.getOptions())
                .answer(request.getAnswer())
                .analysis(request.getAnalysis())
                .score(request.getScore() != null ? BigDecimal.valueOf(request.getScore()) : null)
                .difficulty(request.getDifficulty())
                .knowledgePoints(request.getKnowledgePoints())
                .tags(request.getTags())
                .examFrequency(request.getExamFrequency())
                .commonMistakes(request.getCommonMistakes())
                .imageUrl(request.getImageUrl())
                .source("manual")
                .isPublic(true)
                .build();

        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(UUID.fromString(request.getSubjectId()))
                    .orElseThrow(() -> BusinessException.notFound("学科不存在"));
            question.setSubject(subject);
        }

        if (request.getGradeId() != null) {
            Grade grade = gradeRepository.findById(UUID.fromString(request.getGradeId()))
                    .orElseThrow(() -> BusinessException.notFound("年级不存在"));
            question.setGrade(grade);
        }

        userRepository.findById(userId).ifPresent(question::setCreatedBy);

        question = questionRepository.save(question);
        return ApiResponse.success("创建成功", question);
    }

    @Transactional
    public ApiResponse<Void> deleteQuestion(UUID id) {
        if (!questionRepository.existsById(id)) {
            throw BusinessException.notFound("题目不存在");
        }
        questionRepository.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    private Question toVO(Question q) {
        if (q.getSubject() != null) q.getSubject().getName();
        if (q.getGrade() != null) q.getGrade().getName();
        return q;
    }
}
