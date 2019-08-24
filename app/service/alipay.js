'use strict';

const Service = require('egg').Service;

const Alipay = require('alipay-mobile');

class AlipayService extends Service {
  // 创建支付订单，返回支付地址
  async doAlipay(orderData) {
    return new Promise((resolve, reject) => {
      // 实例化 alipay
      const service = new Alipay(this.config.alipayOptions);
      service.createPageOrderURL(orderData, this.config.alipayBasicParams)
      .then(res => {
        resolve(res.data)
      })
    })
  }
  // 验证异步通知的数据是否正确
  alipayNotify(params){
    // 实例化 alipay
    const service = new Alipay(this.config.alipayOptions);
    return service.makeNotifyResponse(params);
  }
}

module.exports = AlipayService;
