'use strict';

const md5 = require('md5');

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    let result = await this.app.mysql.query('select admin.*, role.id as role_id, role.title as role_title from admin left join role on admin.role_id = role.id');
    await this.ctx.render('admin/manager/index', {
      manager: result
    })
  }
  // 添加管理员页面
  async add() {
    let result = await this.app.mysql.select('role');
    await this.ctx.render('admin/manager/add', {
      role: result
    })
  }
  // 添加管理员
  async doAdd() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    let mobile = this.ctx.request.body.mobile;
    let email = this.ctx.request.body.email;
    let role_id = this.ctx.request.body.role_id;
    let add_time = (new Date()).getTime();
    // 判断用户名是否存在
    let result = await this.app.mysql.select('admin', {
      where: {
        username
      }
    })
    if (result.length > 0) {
      await this.error('/admin/manager/add', '该用户名已存在');
    } else {
      await this.app.mysql.insert('admin', {
        username,
        password: md5(password),
        mobile,
        email,
        role_id,
        add_time
      })
      await this.success('/admin/manager');
    }
  }
  // 修改管理员页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('admin', {
      where: {
        id: id
      }
    })
    let roleResult = await this.app.mysql.select('role');
    await this.ctx.render('admin/manager/edit', {
      manager: result[0],
      role: roleResult
    })
  }
  // 修改管理员
  async doEdit() {
    let id = this.ctx.request.body.id;
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    let mobile = this.ctx.request.body.mobile;
    let email = this.ctx.request.body.email;
    let role_id = this.ctx.request.body.role_id;
    let param = {
      username, mobile, email, role_id
    };
    if (password != '' && password.length < 6) {
      await this.error('/admin', '密码不得少于6位');
      return;
    } else if (password.length >= 6) {
      // 修改密码
      param.password = md5(password);
    }
    await this.app.mysql.update('admin', param, {
      where: {
        id
      }
    })
    await this.success('/admin/manager');
  }
}

module.exports = ManagerController;
