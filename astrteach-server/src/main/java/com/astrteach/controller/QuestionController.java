package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.QuestionRequest;
import com.astrteach.entity.Question;
import com.astrteach.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Question>>> list(
            @RequestParam(required = false) String subjectId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(questionService.listQuestions(subjectId, type, difficulty, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Question>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(questionService.getQuestion(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Question>> create(
            Authentication authentication,
            @Valid @RequestBody QuestionRequest request) {
        UUID userId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(questionService.createQuestion(userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(questionService.deleteQuestion(id));
    }
}
