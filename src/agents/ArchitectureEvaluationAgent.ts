import { ArchitectureAnalysisResult, DesignPattern } from '../types';
import { analyzeArchitecture, detectDesignPatterns, checkBestPractices } from '../services/architectureAnalysis';

export class ArchitectureEvaluationAgent {
  async evaluateArchitecture(code: string, language: string): Promise<ArchitectureAnalysisResult> {
    console.log('[ArchitectureEvaluationAgent] 开始评估架构');

    const architectureAnalysis = analyzeArchitecture(code, language);
    const designPatterns = detectDesignPatterns(code, language);
    const bestPractices = checkBestPractices(code, language);

    return {
      architecture: architectureAnalysis,
      designPatterns,
      bestPracticesViolations: bestPractices.violations,
      improvementSuggestions: this.generateSuggestions(architectureAnalysis, designPatterns, bestPractices)
    };
  }

  private generateSuggestions(
    architecture: any,
    patterns: DesignPattern[],
    practices: { violations: string[] }
  ): string[] {
    const suggestions: string[] = [];

    if (architecture.modularityScore < 70) {
      suggestions.push('提高模块化程度，考虑将大函数拆分为更小的可重用组件');
    }

    if (patterns.length === 0) {
      suggestions.push('考虑应用常见的设计模式（如工厂模式、策略模式）来提高代码可维护性');
    }

    practices.violations.forEach(violation => {
      suggestions.push(`修复架构最佳实践违规: ${violation}`);
    });

    return suggestions;
  }
}