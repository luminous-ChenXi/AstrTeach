package com.astrteach.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "student_profiles")
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", unique = true, nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    @Column(name = "overall_mastery", precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal overallMastery = BigDecimal.ZERO;

    @Column(length = 16)
    private String level;

    @Column(name = "learning_style", length = 32)
    private String learningStyle;

    @Column(name = "study_time_total")
    @Builder.Default
    private Integer studyTimeTotal = 0;

    @Column(name = "homework_completion_rate", precision = 3, scale = 2)
    private BigDecimal homeworkCompletionRate;

    @Column(name = "avg_score", precision = 5, scale = 1)
    private BigDecimal avgScore;

    @Column(columnDefinition = "json", name = "strength_points")
    private String strengthPoints;

    @Column(columnDefinition = "json", name = "weakness_points")
    private String weaknessPoints;

    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
