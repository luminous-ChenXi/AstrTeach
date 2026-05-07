package com.astrteach.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String realName;
    private String phone;
    private String email;
    private String avatarUrl;
    private String role;
    private String schoolId;
    private String schoolName;
    private String status;
    private String createdAt;
}
