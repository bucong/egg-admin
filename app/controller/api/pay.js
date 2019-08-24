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
    let params = this.ctx.request.body;
    // pay_type: 1为PC支付，2为移动端支付
    let order_no = (new Date()).getTime();
    let data = {
      subject: params.subject,
      out_trade_no: order_no.toString(),
      total_amount: params.total_amount
    }
    let url = await this.service.alipay.doAlipay(data, params.pay_type);
    this.ctx.redirect(url);
  }
  // 支付完成阿里异步返回数据
  async alipayNotify(){
    //接收post提交的XML，通过xmlparse中间件将XML转化为json
    const params = this.ctx.request.body;
    console.log(params);
    // 支付成功数据如下
    // { gmt_create: '2019-08-24 21:40:09',
    //   charset: 'utf-8',
    //   gmt_payment: '2019-08-24 21:40:13',
    //   notify_time: '2019-08-24 21:40:13',
    //   subject: '聪哥的egg',
    //   sign:
    //   'K5ryhvVifN+SZRhiIY6hxy7EXzDtuDBahBbzuhYaKoIMkcOMmBizr490aGr6dfsroJFP8TLtfvPT5jiFJ38YbswIJ71triPTjZSvwsi95oqOFv+bm3D6jIX2iz3tZ6AHaipiceDAuZdisDjT+/ofx8SFEradNqpHtP8SpDVIbmmK7S3W1K+IWALQf3QBwuE+jNpCOLTl2q1HCMu0GsHtBJaxoenGnTqmsVZyFUPH8KGSoSW1zgtFl1h8UyJEMN3vbGpSAxzg6eE/xq4WHf91QLPbxc2kEgbF0dkEigSmakKmdd37QBuRdXPTSMSjJLEFoXzA5fsqAR00e8fNUfcNmg==',
    //   buyer_id: '2088122106334055',
    //   invoice_amount: '0.01',
    //   version: '1.0',
    //   notify_id: '2019082400222214013034050511714832',
    //   fund_bill_list: '[{"amount":"0.01","fundChannel":"PCREDIT"}]',
    //   notify_type: 'trade_status_sync',
    //   out_trade_no: '1566654000089',
    //   total_amount: '0.01',
    //   trade_status: 'TRADE_SUCCESS',
    //   trade_no: '2019082422001434050525780333',
    //   auth_app_id: '2018122062672017',
    //   receipt_amount: '0.01',
    //   point_amount: '0.00',
    //   buyer_pay_amount: '0.01',
    //   app_id: '2018122062672017',
    //   sign_type: 'RSA2',
    //   seller_id: '2088821008799161' 
    // }
    var result = await this.service.alipay.alipayNotify(params);
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
