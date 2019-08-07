'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    await this.ctx.render('admin/home/index')
  }
}

module.exports = HomeController;
