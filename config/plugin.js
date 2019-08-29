'use strict';

// had enabled by egg
// exports.static = true;

//nunjucks模板引擎
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
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