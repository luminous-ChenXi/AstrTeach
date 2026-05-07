# AstrTeach 智能教学管理平台

AstrTeach 是一个面向教育行业的智能教学管理平台，深度融合 AI 大模型能力，为教师、学生、家长和管理者提供全方位的教学支持服务。

## 项目结构

```
education-project/
├── astrteach-admin/          # 管理端前端 (Vue 3 + TypeScript)
├── astrteach-server/         # 后端服务 (Spring Boot)
├── Demo/
│   └── AstrBot/              # AI 平台对接参考实现
└── docs/                     # 项目文档
```

## 核心功能

### AI 教学辅助
- **AI 智能备课**：基于课题、年级、学科智能生成完整教案
- **智能组卷**：自适应难度调节，自动匹配题目
- **作业自动批改**：AI 识别答案，自动评分与评语生成
- **学情画像分析**：多维度数据可视化，精准定位薄弱环节

### 班级与教学管理
- **班级管理**：学生信息、考勤、成绩统一管理
- **家校沟通**：多渠道消息聚合，通知同步推送
- **考试测评**：题库管理、试卷生成、成绩分析
- **教科研辅助**：文献检索、数据分析、论文辅助

### 大模型设置中心
- 支持 15+ AI 平台统一接入（OpenAI、DeepSeek、Kimi、智谱 AI 等）
- 多 API Key 管理与负载均衡
- 按服务类型分类：对话模型、语音转文字、文字转语音、嵌入模型

### 消息聚合同步
- 多渠道消息统一编排（企业微信、钉钉、飞书、短信、邮件）
- 智能路由策略：按角色、优先级、时间段自动选择最优通道
- 消息模板化与全链路追踪

## 技术栈

### 前端 (astrteach-admin)
- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **UI 组件库**：Element Plus
- **状态管理**：Pinia
- **路由**：Vue Router

### 后端 (astrteach-server)
- **框架**：Spring Boot 3.3.6
- **语言**：Java 17
- **ORM**：Spring Data JPA
- **数据库**：MySQL
- **安全**：Spring Security + JWT

## 快速开始

### 前端
```bash
cd astrteach-admin
npm install
npm run dev
```

### 后端
```bash
cd astrteach-server
./mvnw spring-boot:run
```

## 许可证

[MIT](LICENSE)

## 贡献者

AstrTeach Team
