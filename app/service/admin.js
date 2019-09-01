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
  // 获取分类列表
  async getCate() {
    let oneLevel = await this.app.mysql.select('goods_cate', {
      where: {
        pid: 0
      }
    });
    let twoLevel = await this.app.mysql.query('select * from goods_cate where pid != 0');
    let result = [];
    for (let item of oneLevel) {
      result.push(item);
      for (let item1 of twoLevel) {
        if (item.id == item1.pid) {
          result.push(item1);
        }
      }
    }
    return result;
  }
  // 获取列表总条数
  async getTotalPage(model, pageSize){
    let totalRes = await this.app.mysql.query('select count(id) from ' + model);
    let totalPage = Math.ceil(totalRes[0]['count(id)'] / pageSize);
    return totalPage
  }
}

module.exports = AdminService;
