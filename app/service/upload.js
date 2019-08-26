'use strict';

const Service = require('egg').Service;

const fs = require('fs');
const path = require('path');
const pump= require('mz-modules/pump');

class UploadService extends Service {
  async uploadImg(parts, storePath) {
    let stream, img_list = []; // 图片访问地址集合
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      // 文件名为：时间戳+随机字符串+.文件后缀
      let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      let target = 'app' + (storePath ? storePath : '/public/admin/upload/') + filename;
      img_list.push((storePath ? storePath : '/public/admin/upload/') + filename);
      let writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    return img_list;
  }
}

module.exports = UploadService;
