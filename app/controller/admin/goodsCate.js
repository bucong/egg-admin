'use strict';

const BaseController = require('./base');

class Goods_cateController extends BaseController {
  async index() {
    let goodsCate = await this.service.admin.getCate();
    await this.ctx.render('admin/goodsCate/index', {
      goodsCate
    })
  }
  // 添加商品分类页面
  async add() {
    let result = await this.app.mysql.select('goods_cate', {
      where: {
        pid: 0
      }
    });
    await this.ctx.render('admin/goodsCate/add', {
      oneLevel: result
    })
  }
  // 添加商品分类
  async doAdd() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let img_url = imgList[0] || '';
    let fields = parts.field;
    fields.cate_img = img_url;
    fields.add_time = (new Date()).getTime();
    await this.app.mysql.insert('goods_cate', fields);
    await this.success('/admin/goodsCate', '添加分类成功')
  }
  // 修改商品分类页面
  async edit() {
    let id = this.ctx.request.query.id;
    let oneLevel = await this.app.mysql.select('goods_cate', {
      where: {
        pid: 0
      }
    });
    let cateList = await this.app.mysql.select('goods_cate', {
      where: {
        id
      }
    });
    await this.ctx.render('admin/goodsCate/edit', {
      cate: cateList[0],
      oneLevel
    })
  }
  // 修改商品分类
  async doEdit() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let img_url = imgList[0];
    let fields = parts.field;
    let id = fields.id;
    if (img_url) {
      fields.cate_img = img_url;
    }
    console.log(fields)
    await this.app.mysql.update('goods_cate', fields, {
      where: {
        id
      }
    });
    await this.success('/admin/goodsCate', '修改分类成功')
  }
}

module.exports = Goods_cateController;
