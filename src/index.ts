import express from 'express';
import { CodeAnalysisAgent } from './agents/CodeAnalysisAgent';
import { ArchitectureEvaluationAgent } from './agents/ArchitectureEvaluationAgent';
import { TestGenerationAgent } from './agents/TestGenerationAgent';
import { LongChainReasoningEngine } from './services/LongChainReasoning';
import { CodeAnalysisResult, ArchitectureAnalysisResult, TestSuite } from './types';

const app = express();
app.use(express.json());

const codeAnalysisAgent = new CodeAnalysisAgent();
const architectureAgent = new ArchitectureEvaluationAgent();
const testAgent = new TestGenerationAgent();
const reasoningEngine = new LongChainReasoningEngine();

app.post('/analyze', async (req: express.Request, res: express.Response) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: '缺少代码或语言参数' });
    }

    // 1. 代码分析
    const analysisResult: CodeAnalysisResult = await codeAnalysisAgent.analyzeCode(code, language);

    // 2. 架构评估
    const architectureResult: ArchitectureAnalysisResult = await architectureAgent.evaluateArchitecture(code, language);

    // 3. 测试生成
    const testSuite: TestSuite = await testAgent.generateTests(code, language);

    // 4. 长链推理
    const reasoningResult = await reasoningEngine.performLongChainReasoning(
      code,
      language,
      analysisResult,
      architectureResult,
      testSuite
    );

    res.json({
      analysis: analysisResult,
      architecture: architectureResult,
      tests: testSuite,
      reasoning: reasoningResult
    });

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI代码审查系统运行在端口 ${PORT}`);
});

export default app;