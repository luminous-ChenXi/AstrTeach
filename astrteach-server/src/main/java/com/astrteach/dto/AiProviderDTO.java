package com.astrteach.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiProviderDTO {
    private String id;
    private String name;
    private String provider;
    private String providerType;
    private String apiBase;
    private List<String> apiKeys;
    private String model;
    private String apiVersion;
    private Integer timeout;
    private String proxy;
    private Map<String, String> customHeaders;
    private Map<String, Object> customExtraBody;
    private String status;
    private Boolean enabled;
    private String schoolId;
    private String createdAt;
    private String updatedAt;
}
