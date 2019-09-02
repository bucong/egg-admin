'use strict';

const Service = require('egg').Service;

const Alipay = require('alipay-mobile');

class AlipayService extends Service {
  // 创建支付订单，返回支付地址
  async doAlipay(orderData, pay_type) {
    return new Promise((resolve, reject) => {
      // 实例化 alipay
      const service = new Alipay(this.config.alipayOptions);
      if (pay_type == 1) {
        // PC端支付
        service.createPageOrderURL(orderData, this.config.alipayBasicParams)
        .then(res => {
          resolve(res.data)
        })
      } else {
        // 移动端支付
        service.createWebOrderURL(orderData, this.config.alipayBasicParams)
        .then(res => {
          resolve(res.data)
        })
      }
    })
  }
  // 验证异步通知的数据是否正确
  alipayNotify(params){
    // 实例化 alipay
    const service = new Alipay(this.config.alipayOptions);
    return service.makeNotifyResponse(params);
  }
  // 退款
  tradeRefund(params){
    const service = new Alipay(this.config.alipayOptions);
    return service.tradeRefundQuery(params);
  }
}

module.exports = AlipayService;
