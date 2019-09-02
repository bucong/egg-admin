'use strict';

const BaseController = require('./base');

class GoodsController extends BaseController {
  async index() {
    let pageNo = this.ctx.request.query.pageNo || 1;
    let pageSize = this.ctx.request.query.pageSize || 20;
    let search = this.ctx.request.query.search;
    if (search && search != '') {
      // 查找
      let result = [];
      if(/^[0-9]+$/.test(search)){
        result = await this.app.mysql.select('goods', {
          where: {
            id: search
          }
        });
      } else {
        result = await this.app.mysql.query('select * from goods where title like "%' + search + '%"');
      }
      await this.ctx.render('admin/goods/index', {
        goods: result,
        pageNo: 1,
        totalPage: 1,
        search
      })
    } else {
      // 列表分页
      let result = await this.app.mysql.select('goods', {
        limit: pageSize,
        offset: (pageNo - 1) * pageSize
      });
      let totalPage = await this.service.admin.getTotalPage('goods', pageSize);
      await this.ctx.render('admin/goods/index', {
        goods: result,
        pageNo,
        totalPage,
        search: ''
      })
    }
  }
  // 添加商品页面
  async add() {
    // 商品类型
    let goodsType = await this.app.mysql.select('goods_type');
    // 商品分类
    let goodsCate = await this.service.admin.getCate();
    await this.ctx.render('admin/goods/add', {
      goodsType, goodsCate
    })
  }
  // 商品类型属性列表
  async getTypeAttr() {
    let type_id = this.ctx.request.query.type_id;
    let typeAttr = await this.app.mysql.select('goods_type_attr', {
      where: {
        type_id
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
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let thumbnail = imgList[0];
    let fields = parts.field;
    let img_list = null;
    if (fields.img_list && typeof(fields.img_list) == 'object') {
      img_list = JSON.stringify(fields.img_list);
    } else if (fields.img_list && typeof(fields.img_list) == 'string') {
      img_list = JSON.stringify([fields.img_list]);
    }
    let goodsData = {
      title: fields.title,
      sub_title: fields.sub_title,
      price: fields.price,
      original_price: fields.original_price,
      thumbnail: thumbnail,
      cate_id: fields.cate_id,
      stock: fields.stock,
      status: fields.status,
      is_hot: fields.is_hot,
      is_new: fields.is_new,
      is_best: fields.is_best,
      description: fields.description,
      content: fields.content,
      relation_goods: fields.relation_goods,
      goods_type_id: fields.goods_type_id,
      goods_gift: fields.goods_gift,
      goods_fitting: fields.goods_fitting,
      seo_keywords: fields.seo_keywords,
      seo_desc: fields.seo_desc,
      img_list: img_list,
      add_time: (new Date()).getTime()
    }
    let insertRes = await this.app.mysql.insert('goods', goodsData);
    if (fields.attr_id_list) {
      let attr_id_list = fields.attr_id_list;
      let attr_value_list = fields.attr_value_list;
      if (typeof(attr_id_list) == 'string') {
        attr_id_list = [attr_id_list]
        attr_value_list = [attr_value_list]
      }
      for (let i = 0; i < attr_id_list.length; i ++) {
        let typeAttrRes = await this.app.mysql.select('goods_type_attr', {
          where: {
            id: attr_id_list[i]
          }
        })
        let attrData = {
          goods_id: insertRes.insertId,
          attr_id: typeAttrRes[0].id,
          attr_type: typeAttrRes[0].attr_type,
          attr_title: typeAttrRes[0].title,
          attr_value: attr_value_list[i]
        };
        await this.app.mysql.insert('goods_attr', attrData);
      }
    }
    await this.success('/admin/goods', '添加商品成功')
  }
  // 修改商品页面
  async edit() {
    // 获取商品信息
    let id = this.ctx.request.query.id;
    let goodsDetail = await this.app.mysql.select('goods', {
      where: {
        id: id
      }
    })
    // 商品类型
    let goodsType = await this.app.mysql.select('goods_type');
    // 商品分类
    let goodsCate = await this.service.admin.getCate();
    // 规格与包装
    let typeAttr = await this.app.mysql.select('goods_attr', {
      where: {
        goods_id: id
      }
    })
    if (typeAttr.length > 0) {
      for (let item of typeAttr) {
        if (item.attr_type == 3) {
          let optionsRes = await this.app.mysql.select('goods_type_attr', {
            where: {
              id: item.attr_id
            }
          })
          item.options_list = optionsRes[0]
        }
      }
    }
    await this.ctx.render('admin/goods/edit', {
      goodsType, goodsCate,
      goods: goodsDetail[0],
      typeAttr
    })
  }
  // 修改商品
  async doEdit() {
    let parts = this.ctx.multipart({ autoFields: true });
    let imgList = await this.service.upload.uploadImg(parts);
    let thumbnail = imgList[0];
    let fields = parts.field;
    console.log(fields)
    let id = fields.id; // 商品id
    let img_list = null;
    if (fields.img_list && typeof(fields.img_list) == 'object') {
      img_list = JSON.stringify(fields.img_list);
    } else if (fields.img_list && typeof(fields.img_list) == 'string') {
      img_list = JSON.stringify([fields.img_list]);
    }
    let goodsData = {
      title: fields.title,
      sub_title: fields.sub_title,
      price: fields.price,
      original_price: fields.original_price,
      cate_id: fields.cate_id,
      stock: fields.stock,
      status: fields.status,
      is_hot: fields.is_hot,
      is_new: fields.is_new,
      is_best: fields.is_best,
      description: fields.description,
      content: fields.content,
      relation_goods: fields.relation_goods,
      goods_type_id: fields.goods_type_id,
      goods_gift: fields.goods_gift,
      goods_fitting: fields.goods_fitting,
      seo_keywords: fields.seo_keywords,
      seo_desc: fields.seo_desc,
      img_list: img_list
    }
    // 判断是否上传新的轮播图，替换原有轮播图
    if (thumbnail) {
      goodsData.thumbnail = thumbnail;
    }
    let goodsRes = await this.app.mysql.update('goods', goodsData, {
      where: {
        id
      }
    });
    if (goodsRes.affectedRows == 1) {
      // 更新商品信息成功
      await this.app.mysql.delete('goods_attr', {
        goods_id: id
      })
    }
    if (fields.attr_id_list) {
      let attr_id_list = fields.attr_id_list;
      let attr_value_list = fields.attr_value_list;
      if (typeof(attr_id_list) == 'string') {
        attr_id_list = [attr_id_list]
        attr_value_list = [attr_value_list]
      }
      for (let i = 0; i < attr_id_list.length; i ++) {
        let typeAttrRes = await this.app.mysql.select('goods_type_attr', {
          where: {
            id: attr_id_list[i]
          }
        })
        let attrData = {
          goods_id: id,
          attr_id: typeAttrRes[0].id,
          attr_type: typeAttrRes[0].attr_type,
          attr_title: typeAttrRes[0].title,
          attr_value: attr_value_list[i]
        };
        await this.app.mysql.insert('goods_attr', attrData);
      }
    }
    await this.success('/admin/goods', '修改商品成功')
  }
  // 删除商品
  async delete() {
    let id = this.ctx.request.query.id;
    await this.app.mysql.delete('goods', {
      id
    })
    await this.app.mysql.delete('goods_attr', {
      goods_id: id
    })
    // 返回原页面
    this.ctx.redirect('/admin/goods', '删除成功');
  }
}

module.exports = GoodsController;
