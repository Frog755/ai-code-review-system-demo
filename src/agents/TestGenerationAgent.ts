import { TestSuite, TestCase } from '../types';
import { generateUnitTests, analyzeTestCoverage } from '../services/testGeneration';

export class TestGenerationAgent {
  async generateTests(code: string, language: string): Promise<TestSuite> {
    console.log('[TestGenerationAgent] 开始生成测试用例');

    const testSuite = await generateUnitTests(code, language);
    const coverageAnalysis = analyzeTestCoverage(code, testSuite);

    return {
      tests: testSuite,
      coverage: coverageAnalysis,
      qualityScore: this.calculateTestQuality(testSuite, coverageAnalysis)
    };
  }

  private calculateTestQuality(testSuite: TestCase[], coverage: any): number {
    const totalTests = testSuite.length;
    const coveredFunctions = coverage.coveredFunctions.length;
    const coverageRate = totalTests > 0 ? (coveredFunctions / coverage.totalFunctions) * 100 : 0;

    return Math.min(coverageRate * 0.6 + totalTests * 2, 100);
  }
}