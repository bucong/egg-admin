'use strict';

const Controller = require('egg').Controller;

class PayController extends Controller {
  // 临时支付页面
  async index() {
    await this.ctx.render('pay/pay')
  }
  // 临时支付结果页面
  async payReturn() {
    await this.ctx.render('pay/payReturn')
  }
  // 支付宝支付
  async doAlipay() {
    let data = {
      subject: '聪哥的egg',
      out_trade_no: '456123789',
      total_amount: '0.01'
    }
    let url = await this.service.alipay.doAlipay(data);
    this.ctx.redirect(url);
  }
  // 支付完成阿里异步返回数据
  async alipayNotify(){
    //接收post提交的XML，通过xmlparse中间件将XML转化为json
    const params = this.ctx.request.body;
    console.log(params);
    var result = await this.service.alipay.alipayNotify(params);
    console.log(result);
    if(result.code == 0){
        if(params.trade_status == 'TRADE_SUCCESS'){
          //更新订单
          console.log('支付成功，更新订单')
        } else {
          console.log('支付失败，结束')
        }
     }
  }
}

module.exports = PayController;
