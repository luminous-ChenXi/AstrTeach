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
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Column(nullable = false, length = 32)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @Column(columnDefinition = "json")
    private String options;

    @Column(nullable = false, columnDefinition = "text")
    private String answer;

    @Column(columnDefinition = "text")
    private String analysis;

    @Column(precision = 5, scale = 1)
    private java.math.BigDecimal score;

    @Column(length = 16)
    private String difficulty;

    @Column(columnDefinition = "json")
    private String knowledgePoints;

    @Column(columnDefinition = "json")
    private String tags;

    @Column(name = "exam_frequency", length = 16)
    private String examFrequency;

    @Column(columnDefinition = "json", name = "common_mistakes")
    private String commonMistakes;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Column(length = 16)
    @Builder.Default
    private String source = "manual";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    @Column(name = "is_public")
    @Builder.Default
    private Boolean isPublic = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
