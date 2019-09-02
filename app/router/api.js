module.exports = app => {
  const { router, controller } = app;
  const xmlparse = app.middleware.xmlparse();
  // 阿里支付
  router.post('/api/pay/doAlipay', controller.api.pay.doAlipay);
  router.post('/api/pay/alipayNotify', xmlparse, controller.api.pay.alipayNotify);
  router.get('/api/pay/tradeRefund', controller.api.pay.tradeRefund); // 退款
};