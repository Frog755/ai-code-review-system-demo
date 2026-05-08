// 示例代码：用户管理服务
class UserService {
  private users: any[] = [];

  // 添加用户
  addUser(user: any): boolean {
    if (!user.name || !user.email) {
      return false;
    }

    // 检查邮箱是否已存在
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }

    this.users.push(user);
    return true;
  }

  // 获取用户
  getUser(email: string): any {
    return this.users.find(u => u.email === email);
  }

  // 删除用户
  deleteUser(email: string): boolean {
    const index = this.users.findIndex(u => u.email === email);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}

// 导出服务
export default new UserService();