package com.astrteach.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AssignmentRequest {
    @NotBlank(message = "标题不能为空")
    private String title;

    @NotBlank(message = "班级ID不能为空")
    private String classId;

    @NotBlank(message = "学科ID不能为空")
    private String subjectId;

    private String lessonPlanId;

    @NotBlank(message = "作业类型不能为空")
    private String homeworkType;

    @NotBlank(message = "题目不能为空")
    private String questions;

    private Double totalScore;
    private String deadline;
}
