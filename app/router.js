'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 前端首页
  router.get('/', controller.index.home.index);

  // 后台登录
  router.get('/admin/login', controller.admin.login.login);
  router.get('/admin/verify', controller.admin.login.verify);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);

  // 后台主页
  router.get('/admin', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);

  // 公共删除方法
  router.get('/admin/delete', controller.admin.base.delete);
};
