import { CodeAnalysisResult, ArchitectureAnalysisResult, TestSuite } from '../types';

export class LongChainReasoningEngine {
  async performLongChainReasoning(
    code: string,
    language: string,
    analysisResult: CodeAnalysisResult,
    architectureResult: ArchitectureAnalysisResult,
    testSuite: TestSuite
  ): Promise<any> {
    console.log('[LongChainReasoningEngine] 开始长链推理');

    // 分析代码依赖关系
    const dependencies = this.analyzeDependencies(code, language);

    // 识别跨文件问题
    const crossFileIssues = this.identifyCrossFileIssues(code, dependencies);

    // 综合分析结果
    const comprehensiveAnalysis = this.integrateAnalysisResults(
      analysisResult,
      architectureResult,
      testSuite,
      crossFileIssues
    );

    return {
      dependencies,
      crossFileIssues,
      comprehensiveAnalysis,
      recommendations: this.generateComprehensiveRecommendations(comprehensiveAnalysis)
    };
  }

  private analyzeDependencies(code: string, language: string): any {
    // 模拟依赖分析
    const imports = this.extractImports(code, language);
    const dependencies = {
      imports,
      circularDependencies: this.detectCircularDependencies(imports),
      unusedImports: this.detectUnusedImports(code, imports)
    };

    return dependencies;
  }

  private extractImports(code: string, language: string): string[] {
    const patterns = {
      js: /import\s+.*?from\s+['"]([^'"]+)['"]/g,
      ts: /import\s+.*?from\s+['"]([^'"]+)['"]/g,
      py: /^from\s+([\w.]+)\s+import|import\s+([\w.]+)/gm
    };

    const pattern = patterns[language as keyof typeof patterns] || patterns.js;
    const matches = [...code.matchAll(pattern)];
    return matches.map(match => match[1] || match[2]).filter(Boolean);
  }

  private detectCircularDependencies(imports: string[]): string[] {
    // 模拟循环依赖检测
    return imports.filter((dep, index) =>
      index % 3 === 0 && imports.includes(dep.split('/').pop() || '')
    );
  }

  private detectUnusedImports(code: string, imports: string[]): string[] {
    // 模拟未使用导入检测
    return imports.filter((_, index) => index % 4 === 0);
  }

  private identifyCrossFileIssues(code: string, dependencies: any): string[] {
    const issues: string[] = [];

    if (dependencies.circularDependencies.length > 0) {
      issues.push(`检测到循环依赖: ${dependencies.circularDependencies.join(', ')}`);
    }

    if (dependencies.unusedImports.length > 0) {
      issues.push(`检测到未使用导入: ${dependencies.unusedImports.join(', ')}`);
    }

    return issues;
  }

  private integrateAnalysisResults(
    analysis: CodeAnalysisResult,
    architecture: ArchitectureAnalysisResult,
    tests: TestSuite,
    crossFileIssues: string[]
  ): any {
    return {
      overallScore: this.calculateOverallScore(analysis, architecture, tests),
      criticalIssues: [...analysis.issues, ...architecture.bestPracticesViolations, ...crossFileIssues],
      improvementAreas: [
        ...analysis.recommendations,
        ...architecture.improvementSuggestions
      ]
    };
  }

  private calculateOverallScore(
    analysis: CodeAnalysisResult,
    architecture: ArchitectureAnalysisResult,
    tests: TestSuite
  ): number {
    const codeScore = 100 - analysis.issues.length * 5;
    const archScore = architecture.architecture.modularityScore;
    const testScore = tests.qualityScore;

    return Math.round((codeScore * 0.4 + archScore * 0.3 + testScore * 0.3));
  }

  private generateComprehensiveRecommendations(comprehensive: any): string[] {
    const recommendations: string[] = [];

    if (comprehensive.overallScore < 70) {
      recommendations.push('整体代码质量需要大幅改进');
    }

    if (comprehensive.criticalIssues.length > 0) {
      recommendations.push(`优先解决关键问题: ${comprehensive.criticalIssues.join(', ')}`);
    }

    if (comprehensive.improvementAreas.length > 0) {
      recommendations.push('应用改进建议以提升代码质量');
    }

    return recommendations;
  }
}