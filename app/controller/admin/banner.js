'use strict';

const BaseController = require('./base');

class BannerController extends BaseController {
  async index() {
    let res = await this.app.mysql.select('banner', {
      orders: [
        ['sort', 'asc'] //降序desc，升序asc
      ]
    });
    await this.ctx.render('admin/banner/index',{
      banner: res
    })
  }
  // 添加轮播图
  async add() {
    await this.ctx.render('admin/banner/add')
  }
  // 添加轮播图上传图片
  async doAdd() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let img_url = imgList[0];
    let fields = parts.field;
    await this.app.mysql.insert('banner', {
      img_url,
      path: fields.path,
      description: fields.description,
      add_time: (new Date()).getTime(),
      type: fields.type,
      sort: fields.sort
    })
    await this.success('/admin/banner', '添加轮播图成功')
  }
}

module.exports = BannerController;
