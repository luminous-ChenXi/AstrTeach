package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.StudentProfileDTO;
import com.astrteach.service.StudentProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/student-profiles")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @GetMapping("/{studentId}")
    public ResponseEntity<ApiResponse<StudentProfileDTO>> getProfile(@PathVariable UUID studentId) {
        return ResponseEntity.ok(studentProfileService.getProfile(studentId));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<ApiResponse<PageResponse<StudentProfileDTO>>> listByClass(
            @PathVariable UUID classId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(studentProfileService.listByClass(classId, page, size));
    }
}
