package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.ClassDTO;
import com.astrteach.dto.PageResponse;
import com.astrteach.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ClassDTO>>> list(
            @RequestParam(required = false) UUID schoolId,
            @RequestParam(required = false) UUID teacherId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(classService.listClasses(schoolId, teacherId, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassDTO>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(classService.getClass(id));
    }
}
