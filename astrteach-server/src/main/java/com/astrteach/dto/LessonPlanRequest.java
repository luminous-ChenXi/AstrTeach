package com.astrteach.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LessonPlanRequest {
    @NotBlank(message = "标题不能为空")
    @Size(max = 256, message = "标题最长256字符")
    private String title;

    @NotBlank(message = "学科ID不能为空")
    private String subjectId;

    private String gradeId;
    private String classType;
    private Integer durationMinutes;
    private String objectives;
    private String keyPoints;
    private String teachingProcess;
    private String boardDesign;
    private String homeworkDesign;
}
