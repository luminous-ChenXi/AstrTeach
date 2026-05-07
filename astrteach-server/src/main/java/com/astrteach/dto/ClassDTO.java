package com.astrteach.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {
    private String id;
    private String name;
    private String schoolId;
    private String schoolName;
    private String gradeId;
    private String gradeName;
    private String headTeacherId;
    private String headTeacherName;
    private String classType;
    private String academicYear;
    private String status;
    private String createdAt;
}
