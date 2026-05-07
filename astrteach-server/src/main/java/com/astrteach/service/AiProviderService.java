package com.astrteach.service;

import com.astrteach.dto.AiProviderDTO;
import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.entity.AiProvider;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.AiProviderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AiProviderService {

    private final AiProviderRepository aiProviderRepository;
    private final ObjectMapper objectMapper;

    public ApiResponse<PageResponse<AiProviderDTO>> listProviders(String providerType, UUID schoolId, int page, int size) {
        Page<AiProvider> providerPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (schoolId != null && providerType != null) {
            providerPage = aiProviderRepository.findBySchoolIdAndProviderType(schoolId, providerType, pageRequest);
        } else if (schoolId != null) {
            providerPage = aiProviderRepository.findBySchoolId(schoolId, pageRequest);
        } else if (providerType != null) {
            providerPage = aiProviderRepository.findByProviderType(providerType, pageRequest);
        } else {
            providerPage = aiProviderRepository.findAll(pageRequest);
        }

        var items = providerPage.getContent().stream().map(this::toDTO).toList();
        PageResponse<AiProviderDTO> response = new PageResponse<>(
                items, providerPage.getTotalElements(), page, size, providerPage.getTotalPages());
        return ApiResponse.success(response);
    }

    public ApiResponse<AiProviderDTO> getProvider(UUID id) {
        AiProvider provider = aiProviderRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("AI 服务提供商不存在"));
        return ApiResponse.success(toDTO(provider));
    }

    @Transactional
    public ApiResponse<AiProviderDTO> createProvider(AiProviderDTO dto) {
        if (dto.getSchoolId() != null && dto.getName() != null) {
            UUID schoolId = UUID.fromString(dto.getSchoolId());
            if (aiProviderRepository.existsByNameAndSchoolId(dto.getName(), schoolId)) {
                throw BusinessException.badRequest("该学校下已存在同名 AI 服务配置");
            }
        }

        AiProvider provider = AiProvider.builder()
                .name(dto.getName())
                .provider(dto.getProvider())
                .providerType(dto.getProviderType())
                .apiBase(dto.getApiBase())
                .apiKeys(toJson(dto.getApiKeys()))
                .model(dto.getModel())
                .apiVersion(dto.getApiVersion())
                .timeout(dto.getTimeout() != null ? dto.getTimeout() : 120)
                .proxy(dto.getProxy())
                .customHeaders(toJson(dto.getCustomHeaders()))
                .customExtraBody(toJson(dto.getCustomExtraBody()))
                .status("active")
                .enabled(dto.getEnabled() != null ? dto.getEnabled() : true)
                .schoolId(dto.getSchoolId() != null ? UUID.fromString(dto.getSchoolId()) : null)
                .build();

        provider = aiProviderRepository.save(provider);
        return ApiResponse.success("创建成功", toDTO(provider));
    }

    @Transactional
    public ApiResponse<AiProviderDTO> updateProvider(UUID id, AiProviderDTO dto) {
        AiProvider provider = aiProviderRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("AI 服务提供商不存在"));

        if (dto.getName() != null) provider.setName(dto.getName());
        if (dto.getProvider() != null) provider.setProvider(dto.getProvider());
        if (dto.getProviderType() != null) provider.setProviderType(dto.getProviderType());
        if (dto.getApiBase() != null) provider.setApiBase(dto.getApiBase());
        if (dto.getApiKeys() != null) provider.setApiKeys(toJson(dto.getApiKeys()));
        if (dto.getModel() != null) provider.setModel(dto.getModel());
        if (dto.getApiVersion() != null) provider.setApiVersion(dto.getApiVersion());
        if (dto.getTimeout() != null) provider.setTimeout(dto.getTimeout());
        if (dto.getProxy() != null) provider.setProxy(dto.getProxy());
        if (dto.getCustomHeaders() != null) provider.setCustomHeaders(toJson(dto.getCustomHeaders()));
        if (dto.getCustomExtraBody() != null) provider.setCustomExtraBody(toJson(dto.getCustomExtraBody()));
        if (dto.getEnabled() != null) provider.setEnabled(dto.getEnabled());

        provider = aiProviderRepository.save(provider);
        return ApiResponse.success("更新成功", toDTO(provider));
    }

    @Transactional
    public ApiResponse<Void> deleteProvider(UUID id) {
        AiProvider provider = aiProviderRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("AI 服务提供商不存在"));
        aiProviderRepository.delete(provider);
        return ApiResponse.success("删除成功", null);
    }

    @Transactional
    public ApiResponse<AiProviderDTO> toggleProvider(UUID id) {
        AiProvider provider = aiProviderRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("AI 服务提供商不存在"));
        provider.setEnabled(!provider.getEnabled());
        provider = aiProviderRepository.save(provider);
        return ApiResponse.success(provider.getEnabled() ? "已启用" : "已禁用", toDTO(provider));
    }

    public ApiResponse<Object> testProvider(UUID id) {
        AiProvider provider = aiProviderRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("AI 服务提供商不存在"));

        if (!provider.getEnabled()) {
            return ApiResponse.error(1001, "该 AI 服务未启用");
        }

        if (provider.getApiKeys() == null || provider.getApiKeys().isEmpty() || "[]".equals(provider.getApiKeys())) {
            return ApiResponse.error(1001, "未配置 API Key");
        }

        return ApiResponse.success("连接测试成功", Map.of(
                "provider", provider.getProvider(),
                "model", provider.getModel() != null ? provider.getModel() : "",
                "apiBase", provider.getApiBase()
        ));
    }

    private AiProviderDTO toDTO(AiProvider p) {
        return AiProviderDTO.builder()
                .id(p.getId().toString())
                .name(p.getName())
                .provider(p.getProvider())
                .providerType(p.getProviderType())
                .apiBase(p.getApiBase())
                .apiKeys(fromJson(p.getApiKeys(), new TypeReference<List<String>>() {}))
                .model(p.getModel())
                .apiVersion(p.getApiVersion())
                .timeout(p.getTimeout())
                .proxy(p.getProxy())
                .customHeaders(fromJson(p.getCustomHeaders(), new TypeReference<Map<String, String>>() {}))
                .customExtraBody(fromJson(p.getCustomExtraBody(), new TypeReference<Map<String, Object>>() {}))
                .status(p.getStatus())
                .enabled(p.getEnabled())
                .schoolId(p.getSchoolId() != null ? p.getSchoolId().toString() : null)
                .createdAt(p.getCreatedAt() != null ? p.getCreatedAt().toString() : null)
                .updatedAt(p.getUpdatedAt() != null ? p.getUpdatedAt().toString() : null)
                .build();
    }

    private String toJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private <T> T fromJson(String json, TypeReference<T> typeRef) {
        if (json == null || json.isEmpty()) return null;
        try {
            return objectMapper.readValue(json, typeRef);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
