'use strict';

const BaseController = require('./base');

class GoodsTypeController extends BaseController {
  async index() {
    const result = await this.app.mysql.select('goodsType');
    await this.ctx.render('admin/goodsType/index', {
      goodsType: result
    })
  }
  // 添加商品类型页面
  async add() {
    await this.ctx.render('admin/goodsType/add')
  }
  // 添加商品类型
  async doAdd() {
    console.log(this.ctx.request.body);
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    let add_time = (new Date()).getTime();
    // 判断商品类型名是否存在
    let result = await this.app.mysql.select('goodsType', {
      where: {
        title
      }
    })
    if (result.length > 0) {
      await this.error('/admin/goodsType/add', '该商品类型名已存在');
    } else {
      await this.app.mysql.insert('goodsType', {
        title, description, add_time
      })
      await this.success('/admin/goodsType');
    }
  }
  // 修改商品类型页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('goodsType', {
      where: {
        id: id
      }
    })
    await this.ctx.render('admin/goodsType/edit', {
      goodsType: result[0]
    })
  }
  // 修改商品类型
  async doEdit() {
    let id = this.ctx.request.body.id;
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    await this.app.mysql.update('goodsType', {
      title, description
    }, {
      where: {
        id
      }
    })
    await this.success('/admin/goodsType');
  }
}

module.exports = GoodsTypeController;
