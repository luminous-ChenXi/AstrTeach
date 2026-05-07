-- AstrTeach 数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS astrteach
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE astrteach;

-- 学校
INSERT INTO schools (id, name, code, province, city, district, address, contact_name, contact_phone, status, created_at, updated_at)
VALUES
    (UUID(), '星河实验小学', 'SCH-XH-001', '浙江省', '杭州市', '西湖区', '文三路268号', '王校长', '13800000001', 'active', NOW(), NOW()),
    (UUID(), '晨曦中学', 'SCH-CX-001', '浙江省', '杭州市', '拱墅区', '湖墅南路186号', '李校长', '13800000002', 'active', NOW(), NOW());

-- 年级
INSERT INTO grades (id, name, stage, order_num)
VALUES
    (UUID(), '一年级', 'primary', 1),
    (UUID(), '二年级', 'primary', 2),
    (UUID(), '三年级', 'primary', 3),
    (UUID(), '四年级', 'primary', 4),
    (UUID(), '五年级', 'primary', 5),
    (UUID(), '六年级', 'primary', 6),
    (UUID(), '初一', 'junior', 7),
    (UUID(), '初二', 'junior', 8),
    (UUID(), '初三', 'junior', 9);

-- 学科
INSERT INTO subjects (id, name, code, stage)
VALUES
    (UUID(), '语文', 'CHN', 'primary'),
    (UUID(), '数学', 'MATH', 'primary'),
    (UUID(), '英语', 'ENG', 'primary'),
    (UUID(), '科学', 'SCI', 'primary'),
    (UUID(), '语文', 'CHN-J', 'junior'),
    (UUID(), '数学', 'MATH-J', 'junior'),
    (UUID(), '英语', 'ENG-J', 'junior'),
    (UUID(), '物理', 'PHY', 'junior'),
    (UUID(), '化学', 'CHEM', 'junior');
