'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /*
    QQ、微信三方登录
    loginType  1-QQ  2-微信
    code  qq和微信临时code
    redirect_uri  qq回调地址
  */
  async thirdLogin() {
    let params = this.ctx.request.body;
    this.ctx.logger.info('三方登录:');
    this.ctx.logger.info(params);
    if (params.loginType == 1) {
      // QQ登录
      let result = await this.service.qqLogin.qqLogin(params);
      this.ctx.body = result;
    } else if (params.loginType == 2) {
      // 微信登录
      let result = await this.service.wxLogin.wxLogin(params);
      this.ctx.body = result;
    }
  }

  /*
    发送手机验证码
    phone  手机号
  */
  async sendVerify(){
    let params = this.ctx.request.body;
    let result = await this.service.user.sendVerify(params);
    this.ctx.body = result;
  }
  /*
    手机号登录
    phone  手机号
    code  验证码
  */
  async phoneLogin(){
    let params = this.ctx.request.body;
    this.ctx.logger.info(params)
    if (params.phone.length == 11) {
      // 查询user表是否存在该号码
      let selectUser = await this.app.mysql.select('user', {
        where: {
          phone: params.phone
        }
      })
      if (selectUser.length > 0) {
        let id = selectUser[0].id;
        // 用户存在，检查发送时间
        let nowTime = (new Date()).getTime();
        let sendTime = selectUser[0].send_time;
        let time;
        if (sendTime) {
          time = (nowTime - sendTime) / 1000 / 60; // 分钟
          if (time > 60) {
            // 验证码超过一个小时过期
            this.ctx.body = {
              code: -1,
              msg: '该验证码已过期，请重新发送'
            }
          } else if (params.code != selectUser[0].send_code) {
            this.ctx.body = {
              code: -1,
              msg: '验证码填写错误'
            }
          } else {
            await this.app.mysql.update('user', {
              status: 1,
              login_type: 3
            }, {
              where: {
                id
              }
            })
            selectUser[0].status = 1
            this.ctx.body = {
              code: 0,
              data: selectUser[0]
            }
          }
        }
      } else {
        this.ctx.body = {
          code: -1,
          msg: '该手机号未发送过验证码'
        }
      }
    } else {
      this.ctx.body = {
        code: -1,
        msg: '手机号格式不正确'
      }
    }
  }
}

module.exports = UserController;
