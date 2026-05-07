package com.astrteach.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ExamPaperRequest {
    @NotBlank(message = "试卷标题不能为空")
    private String title;

    private String subjectId;
    private String gradeId;
    private String classId;

    @NotBlank(message = "总分不能为空")
    private Double totalScore;

    private Integer durationMinutes;

    @NotBlank(message = "试卷结构不能为空")
    private String sections;

    private Boolean isAdaptive;
}
