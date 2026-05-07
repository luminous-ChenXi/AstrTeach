-- AstrTeach 测试数据
-- 密码均为: AstrTeach2026 (BCrypt加密)

-- 先获取学校和年级ID（实际运行时需要替换为真实UUID）
SET @school_id_1 = (SELECT id FROM schools WHERE code = 'SCH-XH-001' LIMIT 1);
SET @school_id_2 = (SELECT id FROM schools WHERE code = 'SCH-CX-001' LIMIT 1);

-- 管理员 (密码: AstrTeach2026)
INSERT INTO users (id, username, password_hash, real_name, phone, email, role, school_id, status, created_at, updated_at)
VALUES (
    UUID(),
    'admin',
    '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK',
    '系统管理员',
    '13900000000',
    'admin@astrteach.com',
    'admin',
    @school_id_1,
    'active',
    NOW(),
    NOW()
);

-- 教师 (密码: AstrTeach2026)
INSERT INTO users (id, username, password_hash, real_name, phone, email, role, school_id, status, created_at, updated_at)
VALUES
    (UUID(), 'teacher_zhang', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '张老师', '13900000001', 'zhang@astrteach.com', 'teacher', @school_id_1, 'active', NOW(), NOW()),
    (UUID(), 'teacher_li', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '李老师', '13900000002', 'li@astrteach.com', 'teacher', @school_id_1, 'active', NOW(), NOW()),
    (UUID(), 'teacher_wang', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '王老师', '13900000003', 'wang@astrteach.com', 'teacher', @school_id_2, 'active', NOW(), NOW());

-- 学生 (密码: AstrTeach2026)
INSERT INTO users (id, username, password_hash, real_name, phone, email, role, school_id, status, created_at, updated_at)
VALUES
    (UUID(), 'student_chen', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '陈小明', '13900000011', 'chen@astrteach.com', 'student', @school_id_1, 'active', NOW(), NOW()),
    (UUID(), 'student_liu', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '刘思远', '13900000012', 'liu@astrteach.com', 'student', @school_id_1, 'active', NOW(), NOW()),
    (UUID(), 'student_zhao', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '赵雨涵', '13900000013', 'zhao@astrteach.com', 'student', @school_id_2, 'active', NOW(), NOW());

-- 家长 (密码: AstrTeach2026)
INSERT INTO users (id, username, password_hash, real_name, phone, email, role, school_id, status, created_at, updated_at)
VALUES
    (UUID(), 'parent_chen', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '陈爸爸', '13900000021', 'parent_chen@astrteach.com', 'parent', @school_id_1, 'active', NOW(), NOW()),
    (UUID(), 'parent_liu', '$2a$12$LJ3m4ys3Lk0TSwMCVMEcHeOZTmE5xQVQd7hJh8fXGYPdKGKv1eKHK', '刘妈妈', '13900000022', 'parent_liu@astrteach.com', 'parent', @school_id_1, 'active', NOW(), NOW());
