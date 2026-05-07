# AstrTeach Admin

AstrTeach 智能教学管理平台 - 管理端前端项目

## 项目简介

AstrTeach 是一个面向教育行业的智能教学管理平台，深度融合 AI 大模型能力，为教师、学生、家长和管理者提供全方位的教学支持服务。

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

## 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **UI 组件库**：Element Plus
- **状态管理**：Pinia
- **路由**：Vue Router
- **HTTP 客户端**：Axios
- **样式**：SCSS

## 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 项目结构

```
src/
├── api/              # API 接口模块
├── assets/           # 静态资源
├── components/       # 公共组件
├── layout/           # 布局组件
├── router/           # 路由配置
├── store/            # Pinia 状态管理
├── styles/           # 全局样式
├── utils/            # 工具函数
└── views/            # 页面视图
```

## 后端服务

本项目需要配合 AstrTeach Server 后端服务使用：
- 后端地址：`http://localhost:8080`
- API 前缀：`/api/v1`

## 许可证

[MIT](LICENSE)

## 贡献者

AstrTeach Team
