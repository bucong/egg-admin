'use strict';
// 设置基类，其他控制器继承该基类
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, msg) {
    await this.ctx.render('admin/public/success', {
      redirectUrl: redirectUrl || '/admin',
      msg: msg || '操作成功！'
    });
  }
  async error(redirectUrl, msg) {
    await this.ctx.render('admin/public/error', {
      redirectUrl: redirectUrl || '/admin',
      msg: msg || '操作失败！'
    });
  }
}

module.exports = BaseController;
