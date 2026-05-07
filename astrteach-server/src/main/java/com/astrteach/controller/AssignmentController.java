package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.AssignmentRequest;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.Assignment;
import com.astrteach.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Assignment>>> list(
            @RequestParam(required = false) UUID teacherId,
            @RequestParam(required = false) UUID classId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(assignmentService.listAssignments(teacherId, classId, status, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Assignment>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(assignmentService.getAssignment(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Assignment>> create(
            Authentication authentication,
            @Valid @RequestBody AssignmentRequest request) {
        UUID teacherId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(assignmentService.createAssignment(teacherId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(assignmentService.deleteAssignment(id));
    }
}
