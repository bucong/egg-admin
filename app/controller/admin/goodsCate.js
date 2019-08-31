'use strict';

const BaseController = require('./base');

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

class Goods_cateController extends BaseController {
  async index() {
    let oneLevel = await this.app.mysql.select('goods_cate', {
      where: {
        pid: 0
      }
    });
    let twoLevel = await this.app.mysql.query('select * from goods_cate where pid != 0');
    let result = [];
    for (let item of oneLevel) {
      result.push(item);
      for (let item1 of twoLevel) {
        if (item.id == item1.pid) {
          result.push(item1);
        }
      }
    }
    await this.ctx.render('admin/goodsCate/index', {
      goodsCate: result
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
}

module.exports = Goods_cateController;
