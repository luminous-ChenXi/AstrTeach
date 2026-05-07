package com.astrteach.service;

import com.astrteach.config.jwt.JwtUtils;
import com.astrteach.dto.*;
import com.astrteach.entity.School;
import com.astrteach.entity.User;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.SchoolRepository;
import com.astrteach.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AuthService {

    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public ApiResponse<LoginResponse> login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> BusinessException.unauthorized("用户名或密码错误"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw BusinessException.unauthorized("用户名或密码错误");
        }

        if (!"active".equals(user.getStatus())) {
            throw BusinessException.forbidden("账号已被禁用");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = jwtUtils.generateAccessToken(user.getId(), user.getRole(), user.getSchool().getId());
        String refreshToken = jwtUtils.generateRefreshToken(user.getId());

        LoginResponse response = LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(7200L)
                .user(toUserDTO(user))
                .build();

        return ApiResponse.success("登录成功", response);
    }

    @Transactional
    public ApiResponse<UserDTO> register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw BusinessException.badRequest("用户名已存在");
        }

        School school = schoolRepository.findById(UUID.fromString(request.getSchoolId()))
                .orElseThrow(() -> BusinessException.notFound("学校不存在"));

        User user = User.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .realName(request.getRealName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .role(request.getRole())
                .school(school)
                .status("active")
                .build();

        user = userRepository.save(user);
        return ApiResponse.success("注册成功", toUserDTO(user));
    }

    public ApiResponse<LoginResponse> refresh(String refreshToken) {
        if (!jwtUtils.validateToken(refreshToken)) {
            throw BusinessException.unauthorized("刷新令牌无效或已过期");
        }

        UUID userId = jwtUtils.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> BusinessException.notFound("用户不存在"));

        String newAccessToken = jwtUtils.generateAccessToken(user.getId(), user.getRole(), user.getSchool().getId());
        String newRefreshToken = jwtUtils.generateRefreshToken(user.getId());

        LoginResponse response = LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .expiresIn(7200L)
                .user(toUserDTO(user))
                .build();

        return ApiResponse.success("刷新成功", response);
    }

    private UserDTO toUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId().toString())
                .username(user.getUsername())
                .realName(user.getRealName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .schoolId(user.getSchool().getId().toString())
                .schoolName(user.getSchool().getName())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
    }
}
