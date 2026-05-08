import { CodeAnalysisResult, CodeIssue } from '../types';
import { analyzeCodeStructure, detectPotentialBugs, checkCodeStyle } from '../services/codeAnalysis';

export class CodeAnalysisAgent {
  async analyzeCode(code: string, language: string): Promise<CodeAnalysisResult> {
    console.log(`[CodeAnalysisAgent] 开始分析代码，语言: ${language}`);

    const structureAnalysis = analyzeCodeStructure(code, language);
    const bugDetection = await detectPotentialBugs(code, language);
    const styleCheck = checkCodeStyle(code, language);

    const issues: CodeIssue[] = [
      ...bugDetection.issues,
      ...styleCheck.issues
    ];

    return {
      structure: structureAnalysis,
      issues,
      complexity: this.calculateComplexity(code),
      recommendations: this.generateRecommendations(issues)
    };
  }

  private calculateComplexity(code: string): number {
    const lines = code.split('\n').length;
    const functions = (code.match(/function|class|const\s+\w+\s*=/g) || []).length;
    return Math.min(lines * 0.5 + functions * 2, 100);
  }

  private generateRecommendations(issues: CodeIssue[]): string[] {
    const recommendations: string[] = [];

    issues.forEach(issue => {
      switch (issue.type) {
        case 'BUG':
          recommendations.push(`修复 ${issue.description}`);
          break;
        case 'STYLE':
          recommendations.push(`调整代码风格: ${issue.description}`);
          break;
        case 'PERFORMANCE':
          recommendations.push(`优化性能: ${issue.description}`);
          break;
      }
    });

    return recommendations;
  }
}