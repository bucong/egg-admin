'use strict';

const Service = require('egg').Service;
class AdminService extends Service {
  async adminLogin(query) {
    let db = this.app.mysql;
    let result = await db.select('admin', {
      columns: ['id', 'username'],
      where: {username: query.account,password: query.password}
    });
    return result;
  }
}

module.exports = AdminService;
