'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 前端首页
  router.get('/', controller.index.home.index);
  // 登录
  router.get('/admin/login', controller.admin.login.login);
  router.get('/admin/verify', controller.admin.login.verify);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  // 后台页面
  router.get('/admin', controller.admin.manager.index);
};
