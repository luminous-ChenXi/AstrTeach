package com.astrteach.controller;

import com.astrteach.dto.AiProviderDTO;
import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.service.AiProviderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/ai-providers")
@RequiredArgsConstructor
public class AiProviderController {

    private final AiProviderService aiProviderService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AiProviderDTO>>> list(
            @RequestParam(required = false) String providerType,
            @RequestParam(required = false) UUID schoolId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(aiProviderService.listProviders(providerType, schoolId, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AiProviderDTO>> get(@PathVariable UUID id) {
        return ResponseEntity.ok(aiProviderService.getProvider(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AiProviderDTO>> create(@Valid @RequestBody AiProviderDTO dto) {
        return ResponseEntity.ok(aiProviderService.createProvider(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AiProviderDTO>> update(@PathVariable UUID id, @Valid @RequestBody AiProviderDTO dto) {
        return ResponseEntity.ok(aiProviderService.updateProvider(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(aiProviderService.deleteProvider(id));
    }

    @PostMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<AiProviderDTO>> toggle(@PathVariable UUID id) {
        return ResponseEntity.ok(aiProviderService.toggleProvider(id));
    }

    @PostMapping("/{id}/test")
    public ResponseEntity<ApiResponse<Object>> test(@PathVariable UUID id) {
        return ResponseEntity.ok(aiProviderService.testProvider(id));
    }
}
