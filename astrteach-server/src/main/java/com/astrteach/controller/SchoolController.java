package com.astrteach.controller;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.SchoolDTO;
import com.astrteach.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<SchoolDTO>>> list(
            @RequestParam(required = false) String province,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(schoolService.listSchools(province, city, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SchoolDTO>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(schoolService.getSchool(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SchoolDTO>> create(
            @RequestParam String name,
            @RequestParam String code,
            @RequestParam String province,
            @RequestParam String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String contactName,
            @RequestParam(required = false) String contactPhone) {
        return ResponseEntity.ok(schoolService.createSchool(name, code, province, city, district, address, contactName, contactPhone));
    }
}
