'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index')
  }
  notFound() {
    this.ctx.body = '404';
  }
}

module.exports = HomeController;
