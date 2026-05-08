export interface CodeIssue {
  type: 'BUG' | 'STYLE' | 'PERFORMANCE';
  description: string;
  line: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface CodeAnalysisResult {
  structure: any;
  issues: CodeIssue[];
  complexity: number;
  recommendations: string[];
}

export interface DesignPattern {
  name: string;
  usage: string;
  benefits: string[];
}

export interface ArchitectureAnalysisResult {
  architecture: any;
  designPatterns: DesignPattern[];
  bestPracticesViolations: string[];
  improvementSuggestions: string[];
}

export interface TestCase {
  name: string;
  code: string;
  coverage: number;
}

export interface TestSuite {
  tests: TestCase[];
  coverage: any;
  qualityScore: number;
}

export interface AnalysisRequest {
  code: string;
  language: string;
}