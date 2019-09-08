'use strict';

const Service = require('egg').Service;

class SendCodeService extends Service {
  async sendVerify(params, sendCode) {
    const apikey = this.config.phoneOptions.apikey;
    let mobile = params.phone;
    this.ctx.logger.info('生成的手机随机验证码是：' + sendCode);
    let text = '【IT营】您的验证码是' + sendCode;

    let result = await this.ctx.curl('https://sms.yunpian.com:443/v2/sms/single_send.json', {
      method: 'POST',
      data: {
        apikey,
        mobile,
        text
      }
    });
    let sendRes = JSON.parse(result.data.toString('utf8'))
    this.ctx.logger.info(sendRes);
    if (sendRes.code == 0) {
      return {
        code: 0,
        data: '发送成功'
      }
    } else {
      return {
        code: -1,
        msg: sendRes.msg
      }
    }
  }
}

module.exports = SendCodeService;
