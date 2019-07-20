'use strict';

// had enabled by egg
// exports.static = true;

//ejs模板引擎
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};

//跨域插件
exports.cors = {
    enable: true,
    package: 'egg-cors',
};

//mysql
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};