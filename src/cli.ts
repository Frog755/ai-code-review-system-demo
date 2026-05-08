#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001';

async function analyzeCodeFile(filePath: string, language?: string) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');

    const response = await axios.post(`${API_URL}/analyze`, {
      code,
      language: language || detectLanguage(filePath)
    });

    displayResults(response.data, filePath);

  } catch (error) {
    console.error(`❌ 分析失败: ${(error as Error).message}`);
    process.exit(1);
  }
}

function detectLanguage(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const languageMap: Record<string, string> = {
    '.js': 'js',
    '.ts': 'ts',
    '.jsx': 'js',
    '.tsx': 'ts',
    '.py': 'py',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.go': 'go',
    '.rs': 'rs',
    '.rb': 'rb',
    '.php': 'php'
  };

  return languageMap[ext] || 'js';
}

function displayResults(data: any, filePath: string) {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 代码分析结果 - ${path.basename(filePath)}`);
  console.log('='.repeat(60) + '\n');

  // 代码分析
  console.log('🔧 代码分析:');
  console.log(`  • 复杂度: ${data.analysis.complexity}`);
  console.log(`  • 问题数量: ${data.analysis.issues.length}`);

  if (data.analysis.issues.length > 0) {
    console.log('  问题详情:');
    data.analysis.issues.forEach((issue: any) => {
      console.log(`    • ${issue.type}: ${issue.description} (行${issue.line}, 严重性: ${issue.severity})`);
    });
  }

  // 架构评估
  console.log('\n🏗️  架构评估:');
  console.log(`  • 模块化评分: ${data.architecture.architecture.modularityScore}`);

  if (data.architecture.designPatterns.length > 0) {
    console.log('  设计模式:');
    data.architecture.designPatterns.forEach((pattern: any) => {
      console.log(`    • ${pattern.name}: ${pattern.usage}`);
    });
  }

  // 测试生成
  console.log('\n🧪 测试生成:');
  console.log(`  • 测试用例数量: ${data.tests.tests.length}`);
  console.log(`  • 测试覆盖率: ${data.tests.coverage.coverageRate.toFixed(2)}%`);
  console.log(`  • 质量评分: ${data.tests.qualityScore}`);

  // 长链推理
  console.log('\n🔗 长链推理:');

  if (data.reasoning.crossFileIssues && data.reasoning.crossFileIssues.length > 0) {
    console.log('  跨文件问题:');
    data.reasoning.crossFileIssues.forEach((issue: string) => {
      console.log(`    ⚠️  ${issue}`);
    });
  }

  // 综合评分
  if (data.reasoning.comprehensiveAnalysis) {
    const score = data.reasoning.comprehensiveAnalysis.overallScore;
    console.log(`\n📈 综合评分: ${score}%`);

    if (score >= 80) {
      console.log('  ✨ 代码质量优秀！');
    } else if (score >= 60) {
      console.log('  ⚠️  代码质量良好，有改进空间');
    } else {
      console.log('  ❌ 代码质量需要大幅改进');
    }
  }

  // 改进建议
  if (data.reasoning.comprehensiveAnalysis) {
    console.log('\n💡 改进建议:');
    data.reasoning.comprehensiveAnalysis.improvementAreas.forEach((suggestion: string, index: number) => {
      console.log(`  ${index + 1}. ${suggestion}`);
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('使用方法:');
    console.log('  npx ai-code-review src/your-file.js           # 检测JavaScript文件');
    console.log('  npx ai-code-review src/your-file.ts --language ts  # 检测TypeScript文件');
    console.log('\n示例:');
    console.log('  npx ai-code-review src/example.ts');
    console.log('  npx ai-code-review src/another-file.js --language js');
    process.exit(0);
  }

  const filePath = args[0];
  const language = args[1] || undefined;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }

  await analyzeCodeFile(filePath, language);
}

main();