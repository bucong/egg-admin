'use strict';

const Service = require('egg').Service;

const Alipay = require('alipay-mobile');

class AlipayService extends Service {
  async doAlipay(orderData) {
    return new Promise((resolve, reject) => {
      const service = new Alipay(this.config.alipayOptions);
      service.createPageOrderURL(orderData, this.config.alipayBasicParams)
      .then(res => {
        console.log(res)
        resolve(res.data)
      })
    })
  }
}

module.exports = AlipayService;
