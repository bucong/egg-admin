'use strict';

const BaseController = require('./base');

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

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
    let stream = await this.ctx.getFileStream(); // 读取流
    let fields = stream.fields; // 表单的其他数据
    let filename = new Date().getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
    let target = 'app/public/admin/upload/' + filename;
    try {
      let writeStream = fs.createWriteStream(target);
      stream.pipe(writeStream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    let img_url = '/public/admin/upload/' + filename;
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
