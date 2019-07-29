'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const result = await this.app.mysql.select('access');
    await this.ctx.render('admin/access/index', {
      access: result
    })
  }
  // 添加角色页面
  async add() {
    await this.ctx.render('admin/access/add')
  }
  // 添加角色
  async doAdd() {
    console.log(this.ctx.request.body);
    delete this.ctx.request.body._csrf
    // let title = this.ctx.request.body.title;
    // let description = this.ctx.request.body.description;
    // let add_time = (new Date()).getTime();
    // // 判断角色名是否存在
    // let result = await this.app.mysql.select('access', {
    //   where: {
    //     title
    //   }
    // })
    // if (result.length > 0) {
    //   await this.error('/admin/access/add', '该角色名已存在');
    // } else {
      await this.app.mysql.insert('access', this.ctx.request.body)
    //   await this.success('/admin/access');
    // }
  }
  // 修改角色页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('access', {
      where: {
        id: id
      }
    })
    await this.ctx.render('admin/access/edit', {
      access: result[0]
    })
  }
  // 修改角色
  async doEdit() {
    let id = this.ctx.request.body.id;
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    await this.app.mysql.update('access', {
      title, description
    }, {
      where: {
        id
      }
    })
    await this.success('/admin/access');
  }
}

module.exports = AccessController;
