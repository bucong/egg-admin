module.exports = app => {
  // 开始前执行
  app.beforeStart(async () => {
    
  });
  // 准备好执行
  app.ready(async () => {
    let db = app.mysql;
    let result = await db.select('config');
    app.imgURL = result[0].imgURL;
  });
  // 关闭前执行
  app.beforeClose(async () => {
    
  });
};