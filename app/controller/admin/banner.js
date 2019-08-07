'use strict';

const path = require('path');
const fs = require('fs');
const BaseController = require('./base');

class BannerController extends BaseController {
  async index() {
    await this.ctx.render('admin/banner/index')
  }
  async upload() {
    let stream = await this.ctx.getFileStream(); // 读取流
    console.log(stream)
    let fields = stream.fields; // 表单的其他数据
    let target = 'app/public/admin/upload/' + path.basename(stream.filename);
    let writeStream = fs.createWriteStream(target);
    stream.pipe(writeStream);
    this.ctx.body = {
      url: target,
      fields: stream.fields
    }

  }
}

module.exports = BannerController;
