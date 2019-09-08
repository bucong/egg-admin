module.exports = app => {
  const { router, controller } = app;
  const xmlparse = app.middleware.xmlparse();

  // 三方登录
  router.post('/api/user/thirdLogin', controller.api.user.thirdLogin);
  // 发送手机验证码
  router.post('/api/user/sendVerify', controller.api.user.sendVerify);
  // 手机号登录
  router.post('/api/user/phoneLogin', controller.api.user.phoneLogin);

  // 阿里支付
  router.post('/api/pay/doAlipay', controller.api.pay.doAlipay);
  router.post('/api/pay/alipayNotify', xmlparse, controller.api.pay.alipayNotify);
  router.get('/api/pay/tradeRefund', controller.api.pay.tradeRefund); // 退款
};