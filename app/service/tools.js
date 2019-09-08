'use strict';

const Service = require('egg').Service;

class ToolsService extends Service {
  // 随机字符串
  async randomString(len) {
    len = len || 8;
    let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }

  // 随机短信验证码
  async randomCode(codeLength){
    let verificationCode = "";
    codeLength = codeLength || 6; //验证码的长度
    let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    for (let i = 0; i < codeLength; i++) {
      let index = Math.floor(Math.random() * 10);
      verificationCode += random[index];
    }
    return verificationCode;
  }
}

module.exports = ToolsService;
