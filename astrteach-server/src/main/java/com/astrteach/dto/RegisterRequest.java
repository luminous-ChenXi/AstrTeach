package com.astrteach.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 4, max = 32, message = "用户名长度4-32字符")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 8, max = 64, message = "密码长度8-64字符")
    private String password;

    @NotBlank(message = "真实姓名不能为空")
    @Size(max = 64, message = "真实姓名最长64字符")
    private String realName;

    private String phone;
    private String email;

    @NotBlank(message = "角色不能为空")
    private String role;

    @NotBlank(message = "学校ID不能为空")
    private String schoolId;
}
