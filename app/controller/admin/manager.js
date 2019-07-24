'use strict';

const md5 = require('md5');

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    const result = await this.app.mysql.select('admin', {
      columns: ['id', 'username', 'right']
    })
    await this.ctx.render('admin/manager/index', {
      manager: result
    })
  }
  // 添加管理员页面
  async add() {
    const result = await this.app.mysql.select('admin', {
      columns: ['id', 'username', 'right']
    })
    await this.ctx.render('admin/manager/add', {
      manager: result
    })
  }
  // 添加管理员
  async doAdd() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    const result = await this.app.mysql.insert('admin', {
      username,
      password: md5(password),
      right: 1
    })
    await this.success('/admin');
  }
}

module.exports = ManagerController;
