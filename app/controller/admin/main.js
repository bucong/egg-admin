'use strict';

const BaseController = require('./base');

class MainController extends BaseController {
  async index() {
    await this.ctx.render('admin/main/index')
  }
  async notFound() {
    await this.error('/admin/welcome', '404');
  }
}

module.exports = MainController;
