import { CodeAnalysisResult, CodeIssue } from '../types';

export function analyzeCodeStructure(code: string, language: string): any {
  const lines = code.split('\n');
  const functions = (code.match(/function|class|const\s+\w+\s*=/g) || []).length;
  const complexity = lines.length * 0.5 + functions * 2;

  return {
    lines,
    functions,
    complexity,
    language
  };
}

export async function detectPotentialBugs(code: string, language: string): Promise<{ issues: CodeIssue[] }> {
  const issues: CodeIssue[] = [];

  // 模拟检测一些常见问题
  if (code.includes('console.log')) {
    issues.push({
      type: 'STYLE',
      description: '避免在生产代码中使用console.log',
      line: code.indexOf('console.log'),
      severity: 'MEDIUM'
    });
  }

  if (code.includes('eval(')) {
    issues.push({
      type: 'BUG',
      description: '避免使用eval，存在安全风险',
      line: code.indexOf('eval('),
      severity: 'HIGH'
    });
  }

  if (code.includes('==')) {
    issues.push({
      type: 'STYLE',
      description: '使用===代替==进行严格比较',
      line: code.indexOf('=='),
      severity: 'LOW'
    });
  }

  return { issues };
}

export function checkCodeStyle(code: string, language: string): { issues: CodeIssue[] } {
  const issues: CodeIssue[] = [];

  // 模拟代码风格检查
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    if (line.length > 100) {
      issues.push({
        type: 'STYLE',
        description: '行过长，建议不超过100字符',
        line: index,
        severity: 'LOW'
      });
    }

    if (line.trim().startsWith('//') && line.trim().length > 80) {
      issues.push({
        type: 'STYLE',
        description: '注释过长',
        line: index,
        severity: 'LOW'
      });
    }
  });

  return { issues };
}