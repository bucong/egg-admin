'use strict';

const BaseController = require('./base');

class goodsTypeAttrController extends BaseController {
  async index() {
    let type_id = this.ctx.request.query.type_id;
    const result = await this.app.mysql.select('goods_type_attr', {
      where: {
        type_id
      }
    });
    await this.ctx.render('admin/goodsTypeAttr/index', {
      goodsTypeAttr: result,
      type_id: type_id
    })
  }
  // 添加商品类型属性页面
  async add() {
    let type_id = this.ctx.request.query.type_id;
    await this.ctx.render('admin/goodsTypeAttr/add', {
      type_id
    })
  }
  // 添加商品类型属性
  async doAdd() {
    console.log(this.ctx.request.body);
    let type_id = this.ctx.request.body.type_id;
    let title = this.ctx.request.body.title;
    let attr_type = this.ctx.request.body.attr_type;
    let attr_value = this.ctx.request.body.attr_value;
    let add_time = (new Date()).getTime();
    // 判断商品类型属性名是否存在
    let result = await this.app.mysql.select('goods_type_attr', {
      where: {
        title,
        type_id
      }
    })
    if (result.length > 0) {
      await this.error('/admin/goodsTypeAttr/add', '该商品类型属性名称已存在');
    } else {
      await this.app.mysql.insert('goods_type_attr', {
        type_id, title, add_time, attr_type, attr_value
      })
      await this.success('/admin/goodsTypeAttr?type_id=' + type_id);
    }
  }
  // 修改商品类型属性页面
  async edit() {
    let id = this.ctx.request.query.id;
    let result = await this.app.mysql.select('goods_type_attr', {
      where: {
        id: id
      }
    })
    await this.ctx.render('admin/goodsTypeAttr/edit', {
      goodsTypeAttr: result[0]
    })
  }
  // 修改商品类型属性
  async doEdit() {
    let id = this.ctx.request.body.id;
    let title = this.ctx.request.body.title;
    let description = this.ctx.request.body.description;
    await this.app.mysql.update('goods_type_attr', {
      title, description
    }, {
      where: {
        id
      }
    })
    await this.success('/admin/goodsTypeAttr');
  }
}

module.exports = goodsTypeAttrController;
