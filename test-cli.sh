#!/bin/bash

echo "=== AI代码审查系统 - CLI测试 ==="

# 检查服务是否运行
echo "检查服务状态..."
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "❌ 服务未运行，请先启动服务:"
    echo "   npx tsc && node dist/index.js"
    exit 1
fi

echo "✅ 服务正在运行"

# 测试1: 检测demo-code.js
echo ""
echo "测试1: 检测 JavaScript 文件"
echo "----------------------------------------"
npx ai-code-review src/demo-code.js --language js

# 测试2: 显示帮助信息
echo ""
echo "测试2: 显示帮助信息"
echo "----------------------------------------"
npx ai-code-review

echo ""
echo "=== 测试完成 ==="