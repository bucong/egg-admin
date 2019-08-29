module.exports = app => {
  const { router, controller } = app;

  // 后台
  router.get('/admin', controller.admin.main.index);

  // 后台登录
  router.get('/admin/login', controller.admin.login.login);
  router.get('/admin/verify', controller.admin.login.verify);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);

  // 公共删除方法
  router.get('/admin/delete', controller.admin.base.delete);
  // 公共修改状态方法
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);

  // 后台欢迎页
  router.get('/admin/welcome', controller.admin.home.index);

  // 管理员
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);

  // 角色
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);

  // 轮播图
  router.get('/admin/banner', controller.admin.banner.index);
  router.get('/admin/banner/add', controller.admin.banner.add);
  router.post('/admin/banner/doAdd', controller.admin.banner.doAdd);

  // 商品类型
  router.get('/admin/goodsType', controller.admin.goodsType.index);
  router.get('/admin/goodsType/add', controller.admin.goodsType.add);
  router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd);
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit);

  // 商品类型属性
  router.get('/admin/goodsTypeAttr', controller.admin.goodsTypeAttr.index);
  router.get('/admin/goodsTypeAttr/add', controller.admin.goodsTypeAttr.add);
  router.post('/admin/goodsTypeAttr/doAdd', controller.admin.goodsTypeAttr.doAdd);
  router.get('/admin/goodsTypeAttr/edit', controller.admin.goodsTypeAttr.edit);
  router.post('/admin/goodsTypeAttr/doEdit', controller.admin.goodsTypeAttr.doEdit);

  // 商品分类
  router.get('/admin/goodsCate', controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
  router.post('/admin/goodsCate/doAdd', controller.admin.goodsCate.doAdd);

  // 商品
  router.get('/admin/goods', controller.admin.goods.index);
  router.get('/admin/goods/add', controller.admin.goods.add);
  router.get('/admin/goods/getTypeAttr', controller.admin.goods.getTypeAttr);
  router.post('/admin/goods/editorUpload', controller.admin.goods.editorUpload);
  router.post('/admin/goods/doAdd', controller.admin.goods.doAdd);
  router.get('/admin/goods/edit', controller.admin.goods.edit);
  router.post('/admin/goods/doEdit', controller.admin.goods.doEdit);
};