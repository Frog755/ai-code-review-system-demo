import { ArchitectureAnalysisResult, DesignPattern } from '../types';

export function analyzeArchitecture(code: string, language: string): any {
  const lines = code.split('\n');
  const functions = (code.match(/function|class|const\s+\w+\s*=/g) || []).length;
  const complexity = lines.length * 0.5 + functions * 2;

  return {
    modularityScore: Math.max(0, 100 - complexity),
    cohesion: complexity < 50 ? '高' : '低',
    coupling: complexity < 50 ? '低' : '高',
    scalability: complexity < 50 ? '好' : '差'
  };
}

export function detectDesignPatterns(code: string, language: string): DesignPattern[] {
  const patterns: DesignPattern[] = [];

  if (code.includes('class') && code.includes('new')) {
    patterns.push({
      name: '工厂模式',
      usage: '通过类创建对象',
      benefits: ['解耦对象创建', '便于扩展']
    });
  }

  if (code.includes('async') && code.includes('await')) {
    patterns.push({
      name: '异步模式',
      usage: '处理异步操作',
      benefits: ['非阻塞执行', '更好的用户体验']
    });
  }

  return patterns;
}

export function checkBestPractices(code: string, language: string): { violations: string[] } {
  const violations: string[] = [];

  // 模拟最佳实践检查
  if (code.length > 1000 && !code.includes('interface') && language === 'ts') {
    violations.push('TypeScript项目应使用接口定义类型');
  }

  if (code.includes('var') && language === 'js') {
    violations.push('避免使用var，改用let或const');
  }

  return { violations };
}