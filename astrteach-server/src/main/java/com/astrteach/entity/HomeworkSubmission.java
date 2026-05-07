package com.astrteach.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "homework_submissions")
public class HomeworkSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(columnDefinition = "json")
    private String images;

    @Column(columnDefinition = "json")
    private String ocrResult;

    @Column(columnDefinition = "json")
    private String answers;

    @Column(precision = 5, scale = 1)
    private BigDecimal score;

    @Column(columnDefinition = "json", name = "grading_detail")
    private String gradingDetail;

    @Column(name = "grading_status", length = 16)
    @Builder.Default
    private String gradingStatus = "pending";

    @Column(name = "graded_by", length = 16)
    private String gradedBy;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;

    @Column(name = "graded_at")
    private LocalDateTime gradedAt;
}
