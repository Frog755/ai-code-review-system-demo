// 示例代码：数据验证工具
class DataValidator {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  validate(data) {
    const errors = [];

    // 检查数据类型
    if (typeof data !== 'object') {
      errors.push('数据必须是对象类型');
      return { valid: false, errors };
    }

    // 检查必填字段
    this.rules.forEach(rule => {
      if (!data.hasOwnProperty(rule.field) || data[rule.field] === null || data[rule.field] === undefined) {
        errors.push(`缺少必填字段: ${rule.field}`);
      }

      // 类型验证
      if (rule.type && typeof data[rule.field] !== rule.type) {
        errors.push(`字段 ${rule.field} 类型错误，期望 ${rule.type}`);
      }

      // 长度验证
      if (rule.minLength && data[rule.field].length < rule.minLength) {
        errors.push(`字段 ${rule.field} 长度不足，至少需要 ${rule.minLength} 个字符`);
      }

      // 自定义验证函数
      if (rule.validator && !rule.validator(data[rule.field])) {
        errors.push(`字段 ${rule.field} 验证失败`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 使用示例
const validator = new DataValidator();
validator.addRule({ field: 'name', type: 'string', minLength: 2 });
validator.addRule({ field: 'email', type: 'string', validator: validateEmail });

const userData = {
  name: '张三',
  email: 'zhangsan@example.com'
};

const result = validator.validate(userData);

console.log('验证结果:', result);

module.exports = { validator, validateEmail };