#!/bin/bash

echo "=== AI代码审查系统演示 ==="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误: 请先安装Node.js"
    exit 1
fi

# 安装依赖
echo "安装依赖..."
npm install

# 启动服务
echo "启动AI代码审查系统..."
npm start &

# 等待服务启动
sleep 3

# 运行演示
echo "运行演示脚本..."
node demo.js

# 清理
echo "演示完成，按Ctrl+C停止服务"