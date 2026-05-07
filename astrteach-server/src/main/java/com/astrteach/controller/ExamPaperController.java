package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.ExamPaperRequest;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.ExamPaper;
import com.astrteach.service.ExamPaperService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/exam-papers")
@RequiredArgsConstructor
public class ExamPaperController {

    private final ExamPaperService examPaperService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ExamPaper>>> list(
            @RequestParam(required = false) UUID teacherId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(examPaperService.listExamPapers(teacherId, status, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ExamPaper>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(examPaperService.getExamPaper(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ExamPaper>> create(
            Authentication authentication,
            @Valid @RequestBody ExamPaperRequest request) {
        UUID teacherId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(examPaperService.createExamPaper(teacherId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(examPaperService.deleteExamPaper(id));
    }
}
