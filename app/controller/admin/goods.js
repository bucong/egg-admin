'use strict';

const BaseController = require('./base');

class GoodsController extends BaseController {
  async index() {
    const result = await this.app.mysql.select('goods');
    await this.ctx.render('admin/goods/index', {
      goods: result
    })
  }
  // 添加商品页面
  async add() {
    // 商品类型
    let goodsType = await this.app.mysql.select('goods_type');
    // 商品分类
    let oneLevel = await this.app.mysql.select('goods_cate', {
      where: {
        pid: 0
      }
    });
    let twoLevel = await this.app.mysql.query('select * from goods_cate where pid != 0');
    let goodsCate = [];
    for (let item of oneLevel) {
      goodsCate.push(item);
      for (let item1 of twoLevel) {
        if (item.id == item1.pid) {
          goodsCate.push(item1);
        }
      }
    }
    await this.ctx.render('admin/goods/add', {
      goodsType, goodsCate
    })
  }
  // 商品类型属性列表
  async getTypeAttr() {
    let cate_id = this.ctx.request.query.cate_id;
    let typeAttr = await this.app.mysql.select('goods_type_attr', {
      where: {
        cate_id
      }
    })
    this.ctx.body = {
      code: 0,
      data: typeAttr
    }
  }
  // 添加富文本图片
  async editorUpload() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    this.ctx.body = {
      errno: 0,
      data: imgList
    }
  }
  // 添加商品
  async doAdd() {
    console.log(this.ctx.request.body);
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    let add_time = (new Date()).getTime();
    // 判断商品名是否存在
    let result = await this.app.mysql.select('goods', {
      where: {
        title
      }
    })
    if (result.length > 0) {
      await this.error('/admin/goods/add', '该商品名已存在');
    } else {
      await this.app.mysql.insert('goods', {
        title, description, add_time
      })
      await this.success('/admin/goods');
    }
  }
  // 修改商品页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('goods', {
      where: {
        id: id
      }
    })
    await this.ctx.render('admin/goods/edit', {
      goods: result[0]
    })
  }
  // 修改商品
  async doEdit() {
    let id = this.ctx.request.body.id;
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    await this.app.mysql.update('goods', {
      title, description
    }, {
      where: {
        id
      }
    })
    await this.success('/admin/goods');
  }
}

module.exports = GoodsController;
