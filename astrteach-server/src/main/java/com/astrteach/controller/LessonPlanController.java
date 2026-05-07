package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.LessonPlanRequest;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.LessonPlan;
import com.astrteach.service.LessonPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/lesson-plans")
@RequiredArgsConstructor
public class LessonPlanController {

    private final LessonPlanService lessonPlanService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<LessonPlan>>> list(
            @RequestParam(required = false) UUID teacherId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(lessonPlanService.listLessonPlans(teacherId, status, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LessonPlan>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(lessonPlanService.getLessonPlan(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LessonPlan>> create(
            Authentication authentication,
            @Valid @RequestBody LessonPlanRequest request) {
        UUID teacherId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(lessonPlanService.createLessonPlan(teacherId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LessonPlan>> update(
            @PathVariable UUID id,
            @Valid @RequestBody LessonPlanRequest request) {
        return ResponseEntity.ok(lessonPlanService.updateLessonPlan(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(lessonPlanService.deleteLessonPlan(id));
    }
}
