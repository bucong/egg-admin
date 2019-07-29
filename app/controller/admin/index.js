'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    await this.ctx.render('admin/index/home')
  }
}

module.exports = HomeController;
