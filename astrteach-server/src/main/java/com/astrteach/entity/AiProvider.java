package com.astrteach.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ai_providers")
public class AiProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 64)
    private String name;

    @Column(nullable = false, length = 64)
    private String provider;

    @Column(nullable = false, length = 64)
    private String providerType;

    @Column(nullable = false, length = 128)
    private String apiBase;

    @Column(columnDefinition = "json")
    private String apiKeys;

    @Column(length = 128)
    private String model;

    @Column(length = 32)
    private String apiVersion;

    @Column
    private Integer timeout;

    @Column(length = 256)
    private String proxy;

    @Column(columnDefinition = "json")
    private String customHeaders;

    @Column(columnDefinition = "json")
    private String customExtraBody;

    @Column(nullable = false, length = 16)
    @Builder.Default
    private String status = "active";

    @Column(nullable = false)
    @Builder.Default
    private Boolean enabled = true;

    @Column(name = "school_id")
    private UUID schoolId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
