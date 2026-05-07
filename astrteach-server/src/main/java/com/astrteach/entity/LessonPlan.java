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
@Table(name = "lesson_plans")
public class LessonPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 256)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @Column(name = "class_type", length = 16)
    private String classType;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(columnDefinition = "json")
    private String objectives;

    @Column(columnDefinition = "json")
    private String keyPoints;

    @Column(columnDefinition = "json", name = "teaching_process")
    private String teachingProcess;

    @Column(name = "board_design", columnDefinition = "text")
    private String boardDesign;

    @Column(columnDefinition = "json", name = "homework_design")
    private String homeworkDesign;

    @Column(length = 16)
    @Builder.Default
    private String source = "ai";

    @Builder.Default
    private Integer version = 1;

    @Column(length = 16)
    @Builder.Default
    private String status = "draft";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
