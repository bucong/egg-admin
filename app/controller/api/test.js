'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    this.ctx.body = {
		code: 0,
		data: {},
		msg: '测试接口'
	};
  }
}

module.exports = TestController;
