package com.astrteach.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDTO {
    private String id;
    private String studentId;
    private String studentName;
    private String classId;
    private String className;
    private Double overallMastery;
    private String level;
    private String learningStyle;
    private Integer studyTimeTotal;
    private Double homeworkCompletionRate;
    private Double avgScore;
    private String strengthPoints;
    private String weaknessPoints;
    private String lastUpdatedAt;
    private String createdAt;
}
