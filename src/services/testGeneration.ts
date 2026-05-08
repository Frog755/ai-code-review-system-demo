import { TestCase, TestSuite } from '../types';

export async function generateUnitTests(code: string, language: string): Promise<TestCase[]> {
  const tests: TestCase[] = [];

  // 模拟生成测试用例
  const functions = (code.match(/function\s+(\w+)/g) || []).map(match => match.replace('function ', ''));
  const classes = (code.match(/class\s+(\w+)/g) || []).map(match => match.replace('class ', ''));

  [...functions, ...classes].forEach(name => {
    tests.push({
      name: `test_${name}_basic_functionality`,
      code: `
test('${name} should work correctly', () => {
  const result = ${name}();
  expect(result).toBeDefined();
});
      `.trim(),
      coverage: Math.random() * 100
    });
  });

  return tests;
}

export function analyzeTestCoverage(code: string, testSuite: TestCase[]): any {
  const functions = (code.match(/function\s+(\w+)/g) || []).length;
  const coveredFunctions = Math.min(testSuite.length, functions);

  return {
    totalFunctions: functions,
    coveredFunctions,
    coverageRate: functions > 0 ? (coveredFunctions / functions) * 100 : 0,
    missingTests: functions - coveredFunctions
  };
}