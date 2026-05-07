package com.astrteach.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuestionRequest {
    @NotBlank(message = "题目内容不能为空")
    private String content;

    @NotBlank(message = "题目类型不能为空")
    private String type;

    private String subjectId;
    private String gradeId;
    private String options;
    private String answer;
    private String analysis;
    private Double score;
    private String difficulty;
    private String knowledgePoints;
    private String tags;
    private String examFrequency;
    private String commonMistakes;
    private String imageUrl;
}
