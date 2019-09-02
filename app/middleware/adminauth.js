// 后台管理权限
let url = require('url'); // 解析路由path
module.exports = options => {
  return async function adminauth(ctx, next) {
    // 定义admin全局安全认证变量
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer'];
    
    // 解析路由path
    let pathName = url.parse(ctx.request.url).pathname;
    if(ctx.session.adminInfo){
      ctx.state.adminInfo = ctx.session.adminInfo;
      if (ctx.state.adminInfo.is_super == 1) {
        // 超级管理员
        await next();
      } else if (pathName != '/admin/manager' && pathName != '/admin/manager/doAdd' && pathName != '/admin/manager/doEdit' && pathName != '/admin/role' && pathName != '/admin/role/doAdd' && pathName != '/admin/role/doEdit') {
        // 管理员
        await next();
      } else if (pathName == '/admin/manager/doEdit' && ctx.request.body.id == ctx.session.adminInfo.id) {
        // 只能修改自己的信息
        await next();
      } else {
        ctx.body = "<h2>没有访问权限！</h2>"
      }
    }else{
      if(pathName == '/admin/login' || pathName == '/admin/doLogin' || pathName == '/admin/verify'){
        await next();
      }else{
        ctx.redirect('/admin/login');
      }
    }
  }
}