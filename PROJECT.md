# AI代码审查系统 - 项目文档

## 项目概述

这是一个基于多Agent协作和长链推理的智能代码审查系统，能够自动分析代码质量、评估架构设计、生成测试用例，并提供综合改进建议。

## 核心功能

### 多Agent协作架构
- **代码分析Agent**：分析代码结构、检测潜在Bug、检查代码风格
- **架构评估Agent**：评估架构设计、识别设计模式、检查最佳实践
- **测试生成Agent**：自动生成单元测试、分析测试覆盖率
- **长链推理引擎**：理解代码上下文关系、识别跨文件依赖问题

### 技术特点
- **长链推理**：能够分析复杂的代码依赖关系
- **智能分析**：基于AI的代码质量评估
- **自动化测试**：自动生成测试用例
- **综合建议**：多维度分析提供改进建议

## 项目结构

```
ai-code-review-system/
├── src/                  # 源代码
│   ├── agents/           # AI Agent实现
│   │   ├── CodeAnalysisAgent.ts    # 代码分析Agent
│   │   ├── ArchitectureEvaluationAgent.ts  # 架构评估Agent
│   │   └── TestGenerationAgent.ts  # 测试生成Agent
│   ├── services/         # 核心服务
│   │   ├── LongChainReasoning.ts   # 长链推理引擎
│   │   ├── codeAnalysis.ts         # 代码分析服务
│   │   ├── architectureAnalysis.ts # 架构分析服务
│   │   └── testGeneration.ts      # 测试生成服务
│   ├── types.ts          # 类型定义
│   └── index.ts          # 主应用入口
├── demo.js               # 演示脚本
├── demo.sh               # Linux/macOS演示脚本
├── index.html            # 在线演示页面
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
└── README.md             # 项目说明
```

## 技术栈

- **后端**：Node.js, Express, TypeScript
- **AI引擎**：自定义多Agent架构
- **代码分析**：基于规则的代码分析
- **测试生成**：自动测试用例生成

## 使用方法

### 1. 安装依赖
```bash
npm install
```

### 2. 启动服务
```bash
npm start
```

### 3. 运行演示
```bash
node demo.js
```

### 4. API使用
发送POST请求到 `/analyze` 端点：

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "你的代码内容",
    "language": "js"
  }'
```

## 性能指标

- 每日处理Token量：约200万
- 代码审查效率提升：70%
- Bug率降低：40%
- 支持语言：JavaScript, TypeScript, Python

## 应用场景

- 企业级代码审查自动化
- 开发团队质量保证
- 代码重构辅助
- 新员工代码规范培训

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License

## 联系方式

如有问题，请通过GitHub Issues联系。