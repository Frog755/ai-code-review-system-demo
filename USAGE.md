# AI代码审查系统 - 使用指南

## 快速开始

### 1. 启动AI代码审查服务

```bash
# 先编译TypeScript代码
npx tsc

# 启动服务
node dist/index.js
```

服务将运行在 `http://localhost:3001`

### 2. 使用CLI检测代码

#### 基本用法

```bash
npx ai-code-review src/your-file.js
```

#### 指定编程语言

```bash
npx ai-code-review src/your-file.ts --language ts
npx ai-code-review src/your-file.py --language py
npx ai-code-review src/your-file.js --language js
```

## 检测你的代码

### 示例1：检测TypeScript文件

假设你有以下文件 `src/user.ts`：

```typescript
class UserService {
  private users: any[] = [];

  addUser(user: any): boolean {
    if (!user.name || !user.email) {
      return false;
    }

    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }

    this.users.push(user);
    return true;
  }

  getUser(email: string): any {
    return this.users.find(u => u.email === email);
  }
}
```

运行检测：

```bash
npx ai-code-review src/user.ts
```

### 示例2：检测JavaScript文件

假设你有 `src/utils.js`：

```javascript
function calculateSum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}
```

运行检测：

```bash
npx ai-code-review src/utils.js
```

### 示例3：检测Python文件

假设你有 `src/data_processor.py`：

```python
class DataProcessor:
    def process_data(self, data):
        if not data:
            return None
        return [item * 2 for item in data]

    def filter_data(self, data, threshold):
        return [item for item in data if item > threshold]
```

运行检测：

```bash
npx ai-code-review src/data_processor.py
```

## API使用方式

如果你更喜欢使用API，可以通过HTTP请求调用：

### 使用curl

```bash
curl -X POST http://localhost:3001/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "你的代码内容",
    "language": "js"
  }'
```

### 使用JavaScript

```javascript
const axios = require('axios');

const code = `
  function example() {
    var result = 0;
    return result;
  }
`;

axios.post('http://localhost:3001/analyze', {
  code: code,
  language: 'js'
})
.then(response => {
  console.log(response.data);
});
```

### 使用Python

```python
import requests

code = """
def example():
    result = 0
    return result
"""

response = requests.post('http://localhost:3001/analyze', json={
    'code': code,
    'language': 'py'
})
print(response.json())
```

## 支持的语言

系统支持以下编程语言的代码检测：

- JavaScript (.js)
- TypeScript (.ts)
- Python (.py)
- Java (.java)
- C++ (.cpp)
- C (.c)
- Go (.go)
- Rust (.rs)
- Ruby (.rb)
- PHP (.php)

## 输出说明

系统会提供以下分析结果：

1. **代码分析**：复杂度、问题列表
2. **架构评估**：模块化评分、设计模式识别
3. **测试生成**：测试用例数量、覆盖率
4. **长链推理**：跨文件问题检测
5. **综合评分**：整体代码质量评分
6. **改进建议**：具体的优化建议

## 在线演示

完整的在线演示页面：https://frog755.github.io/ai-code-review-system-demo/

GitHub项目：https://github.com/Frog755/ai-code-review-system-demo/