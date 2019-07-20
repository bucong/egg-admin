'use strict';

const BaseController = require('./base');
let svgCaptcha = require('svg-captcha');

class LoginController extends BaseController {
  // 登录页
  async login() {
    await this.ctx.render('admin/login')
  }
  // 登录接口
  async doLogin() {
    console.log(this.ctx.request.body);
    console.log(this.ctx.session.verify);
    this.ctx.session.adminInfo = {
      user: this.ctx.request.body.username
    }
    await this.success();
  }
  // 验证码
  async verify() {
    let captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966"
    });
    this.ctx.session.verify = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
}

module.exports = LoginController;
