'use strict';

const md5 = require('md5');

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const result = await this.app.mysql.select('role');
    await this.ctx.render('admin/role/index', {
      role: result
    })
  }
  // 添加角色页面
  async add() {
    await this.ctx.render('admin/role/add')
  }
  // 添加角色
  async doAdd() {
    console.log(this.ctx.request.body);
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    let add_time = (new Date()).getTime();
    // 判断角色名是否存在
    let result = await this.app.mysql.select('role', {
      where: {
        title
      }
    })
    if (result.length > 0) {
      await this.error('/admin/role/add', '该角色名已存在');
    } else {
      await this.app.mysql.insert('role', {
        title, description, add_time
      })
      await this.success('/admin/role');
    }
  }
  // 修改角色页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('role', {
      where: {
        id: id
      }
    })
    await this.ctx.render('admin/role/edit', {
      role: result[0]
    })
  }
  // 修改角色
  async doEdit() {
    let id = this.ctx.request.body.id;
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    await this.app.mysql.update('role', {
      title, description
    }, {
      where: {
        id
      }
    })
    await this.success('/admin/role');
  }
}

module.exports = RoleController;
