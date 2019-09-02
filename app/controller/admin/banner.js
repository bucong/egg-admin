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
  // 修改轮播图
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('banner', {
      where: {
        id
      }
    })
    await this.ctx.render('admin/banner/edit', {
      banner: result[0]
    })
  }
  // 修改轮播图上传图片
  async doEdit() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let img_url = imgList[0];
    let fields = parts.field;
    let params = {
      path: fields.path,
      description: fields.description,
      type: fields.type,
      sort: fields.sort
    }
    if (img_url) {
      params.img_url = img_url
    }
    await this.app.mysql.update('banner', params, {
      where: {
        id: fields.id
      }
    })
    await this.success('/admin/banner', '修改轮播图成功')
  }
}

module.exports = BannerController;
