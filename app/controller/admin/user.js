'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async index() {
    let pageNo = this.ctx.request.query.pageNo || 1;
    let pageSize = this.ctx.request.query.pageSize || 20;
    let search = this.ctx.request.query.search;
    if (search && search != '') {
      // 查找
      let result = [];
      if(/^[0-9]+$/.test(search)){
        result = await this.app.mysql.select('user', {
          where: {
            id: search
          }
        });
      } else {
        result = await this.app.mysql.query('select * from user where name like "%' + search + '%"');
      }
      await this.ctx.render('admin/user/index', {
        user: result,
        pageNo: 1,
        totalPage: 1,
        search
      })
    } else {
      // 列表分页
      let result = await this.app.mysql.select('user', {
        limit: pageSize,
        offset: (pageNo - 1) * pageSize
      });
      let totalPage = await this.service.admin.getTotalPage('user', pageSize);
      await this.ctx.render('admin/user/index', {
        user: result,
        pageNo,
        totalPage,
        search: ''
      })
    }
  }
}

module.exports = UserController;
