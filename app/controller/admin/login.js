'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');

class LoginController extends BaseController {
  // 登录页
  async login() {
    await this.ctx.render('admin/login')
  }
  // 登录接口
  async doLogin() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    let verify = this.ctx.request.body.verify;
    if(username.length < 5 || password.length < 5){
      await this.error('/admin/login', '用户名和密码不能少于5位');
    }else if(verify.toUpperCase() != this.ctx.session.verify.toUpperCase()){
      await this.error('/admin/login', '验证码不正确');
    }else{
      const result = await this.app.mysql.select('admin', {
        where: {
          username,
          password: md5(password)
        }
      })
      if(result.length > 0){
        let adminInfo = result[0];
        if(adminInfo.status == 1){
          this.ctx.session.adminInfo = adminInfo;
          await this.success('/admin');
        }else{
          await this.error('/admin/login', '您已被禁止访问，请联系管理员');
        }
      }else{
        await this.error('/admin/login', '用户名或密码错误');
      }
    }
  }
  // 验证码
  async verify() {
    let captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966"
    });
    this.ctx.session.verify = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
  // 退出登录
  async loginOut() {
    this.ctx.session.adminInfo = null;
    this.ctx.redirect('/admin/login')
  }
}

module.exports = LoginController;
