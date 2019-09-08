'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 获取新token
  async getToken() {
    let str = await this.service.tools.randomString();
    return str + (new Date()).getTime();
  }
  // 发送验证码
  async sendVerify(params){
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
          time = (nowTime - sendTime) / 1000;
          if (time < 60) {
            return {
              code: -1,
              msg: '发送验证码两次间隔不得少于60秒'
            }
          }
        }
        let sendCode = await this.service.tools.randomCode();
        await this.app.mysql.update('user', {
          send_time: nowTime,
          send_code: sendCode
        }, {
          where: {
            id
          }
        })
        return await this.service.sendVerify.sendVerify(params, sendCode);
      } else {
        // 用户不存在，新增用户
        let sendCode = await this.service.tools.randomCode();
        await this.app.mysql.insert('user', {
          phone: params.phone,
          send_time: (new Date()).getTime(),
          send_code: sendCode,
          status: 0,
          add_time: (new Date()).getTime()
        })
        return await this.service.sendVerify.sendVerify(params, sendCode);
      }
    } else {
      return {
        code: -1,
        msg: '手机号格式不正确'
      }
    }
  }
}

module.exports = UserService;
