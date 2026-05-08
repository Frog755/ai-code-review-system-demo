const axios = require('axios');
const fs = require('fs');

async function runDemo() {
  try {
    // 读取示例代码
    const code = fs.readFileSync('./src/example.ts', 'utf8');

    // 发送分析请求
    const response = await axios.post('http://localhost:3000/analyze', {
      code: code,
      language: 'ts'
    });

    console.log('=== AI代码审查系统分析结果 ===\n');

    // 显示代码分析结果
    console.log('📊 代码分析:');
    console.log(`- 复杂度: ${response.data.analysis.complexity}`);
    console.log(`- 问题数量: ${response.data.analysis.issues.length}`);
    response.data.analysis.issues.forEach(issue => {
      console.log(`  • ${issue.type}: ${issue.description} (严重性: ${issue.severity})`);
    });

    // 显示架构评估结果
    console.log('\n🏗️  架构评估:');
    console.log(`- 模块化评分: ${response.data.architecture.architecture.modularityScore}`);
    console.log(`- 设计模式: ${response.data.architecture.designPatterns.length} 个`);
    response.data.architecture.designPatterns.forEach(pattern => {
      console.log(`  • ${pattern.name}: ${pattern.usage}`);
    });

    // 显示测试生成结果
    console.log('\n🧪 测试生成:');
    console.log(`- 测试用例数量: ${response.data.tests.tests.length}`);
    console.log(`- 测试覆盖率: ${response.data.tests.coverage.coverageRate.toFixed(2)}%`);

    // 显示长链推理结果
    console.log('\n🔗 长链推理:');
    if (response.data.reasoning.crossFileIssues.length > 0) {
      console.log('⚠️  跨文件问题:');
      response.data.reasoning.crossFileIssues.forEach(issue => {
        console.log(`  • ${issue}`);
      });
    }

    console.log(`\n📈 综合评分: ${response.data.reasoning.comprehensiveAnalysis.overallScore}%`);
    console.log('\n💡 改进建议:');
    response.data.reasoning.comprehensiveAnalysis.improvementAreas.forEach(suggestion => {
      console.log(`  • ${suggestion}`);
    });

  } catch (error) {
    console.error('演示运行失败:', error.message);
  }
}

// 启动演示
runDemo();