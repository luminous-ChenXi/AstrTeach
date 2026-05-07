package com.astrteach.service;

import com.astrteach.dto.ApiResponse;
import com.astrteach.dto.PageResponse;
import com.astrteach.dto.UserDTO;
import com.astrteach.entity.User;
import com.astrteach.exception.BusinessException;
import com.astrteach.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UserService {

    private final UserRepository userRepository;

    public ApiResponse<UserDTO> getProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> BusinessException.notFound("用户不存在"));
        return ApiResponse.success(toDTO(user));
    }

    public ApiResponse<PageResponse<UserDTO>> listUsers(String schoolId, String role, int page, int size) {
        Page<User> userPage;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (schoolId != null && role != null) {
            userPage = userRepository.findBySchoolIdAndRole(
                    UUID.fromString(schoolId), role, pageRequest);
        } else if (schoolId != null) {
            userPage = userRepository.findBySchoolId(UUID.fromString(schoolId), pageRequest);
        } else if (role != null) {
            userPage = userRepository.findByRole(role, pageRequest);
        } else {
            userPage = userRepository.findAll(pageRequest);
        }

        var items = userPage.getContent().stream().map(this::toDTO).toList();
        PageResponse<UserDTO> response = new PageResponse<>(
                items, userPage.getTotalElements(), page, size, userPage.getTotalPages());
        return ApiResponse.success(response);
    }

    @Transactional
    public ApiResponse<UserDTO> updateProfile(UUID userId, String realName, String phone, String email, String avatarUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> BusinessException.notFound("用户不存在"));

        if (realName != null) user.setRealName(realName);
        if (phone != null) user.setPhone(phone);
        if (email != null) user.setEmail(email);
        if (avatarUrl != null) user.setAvatarUrl(avatarUrl);

        userRepository.save(user);
        return ApiResponse.success("更新成功", toDTO(user));
    }

    private UserDTO toDTO(User user) {
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
