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
      await next();
    }else{
      if(pathName == '/admin/login' || pathName == '/admin/doLogin' || pathName == '/admin/verify'){
        await next();
      }else{
        ctx.redirect('/admin/login');
      }
    }
  }
}