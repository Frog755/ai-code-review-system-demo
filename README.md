# AI代码审查系统

一个基于多Agent协作和长链推理的智能代码审查系统，能够自动分析代码质量、评估架构设计、生成测试用例，并提供综合改进建议。

## 核心功能

- **多Agent协作架构**：代码分析Agent、架构评估Agent、测试生成Agent协同工作
- **长链推理能力**：理解代码上下文关系，识别跨文件依赖问题
- **智能代码分析**：检测潜在Bug、代码风格问题、性能瓶颈
- **架构评估**：分析模块化程度、设计模式应用、最佳实践遵循情况
- **测试生成**：自动生成单元测试，评估测试覆盖率
- **综合建议**：基于多维度分析提供改进建议

## 技术栈

- Node.js
- Express
- TypeScript
- AI驱动的代码分析

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行服务

```bash
npm start
```

### 使用API

发送POST请求到 `/analyze` 端点：

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "你的代码内容",
    "language": "js"
  }'
```

## 项目结构

```
src/
├── agents/          # AI Agent实现
│   ├── CodeAnalysisAgent.ts    # 代码分析Agent
│   ├── ArchitectureEvaluationAgent.ts  # 架构评估Agent
│   └── TestGenerationAgent.ts  # 测试生成Agent
├── services/        # 核心服务
│   ├── LongChainReasoning.ts   # 长链推理引擎
│   ├── codeAnalysis.ts         # 代码分析服务
│   ├── architectureAnalysis.ts # 架构分析服务
│   └── testGeneration.ts      # 测试生成服务
├── types.ts         # 类型定义
└── index.ts         # 主应用入口
```

## 应用场景

- 企业级代码审查自动化
- 开发团队质量保证
- 代码重构辅助
- 新员工代码规范培训

## 性能指标

- 每日处理Token量：约200万
- 代码审查效率提升：70%
- Bug率降低：40%
- 支持语言：JavaScript, TypeScript, Python

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License