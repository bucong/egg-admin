'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 前端首页
  router.get('/', controller.index.home.index);

  // 后台管理系统
  require('./router/admin')(app);

  // api
  require('./router/api')(app);
  
  // 前端临时页面
  router.get('/pay', controller.api.pay.index); // 支付页面
  router.get('/pay/payReturn', controller.api.pay.payReturn); // 支付回调页面

  // 404
  router.get('*', controller.admin.main.notFound);

};
