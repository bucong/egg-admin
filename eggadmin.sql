/*
Navicat MySQL Data Transfer

Source Server         : aliyun
Source Server Version : 50633
Source Host           : 47.100.51.191:3306
Source Database       : eggadmin

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2019-09-08 13:55:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) DEFAULT NULL,
  `action_name` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `sort` int(255) DEFAULT '100',
  `description` varchar(255) DEFAULT NULL,
  `status` int(255) DEFAULT '1',
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES ('1', '商品管理', '添加', '1', 'product', '0', '100', '模块描述', '1', null);

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int(255) DEFAULT '1',
  `role_id` int(11) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `is_super` int(11) DEFAULT '0' COMMENT '超级管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('4', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '17621960934', '531053266@qq.com', '1', '7', '1564068996262', '1');
INSERT INTO `admin` VALUES ('6', 'jack123', 'e10adc3949ba59abbe56e057f20f883e', '17629283791', '384747@qq.com', '1', null, '1566029128667', null);

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT '1' COMMENT '1内部链接，2外部链接',
  `add_time` varchar(255) DEFAULT NULL,
  `sort` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('6', '/public/admin/upload/1567434885410nsu7bb2vasm.jpg', '博客', 'https://blog.csdn.net/bocongbo/article/details/83656754', '2', '1566831606739', '88');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float(10,0) DEFAULT NULL COMMENT '缩略图',
  `original_price` float(10,0) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL COMMENT '缩略图',
  `stock` int(11) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `status` int(2) DEFAULT '1',
  `is_best` int(2) DEFAULT '0' COMMENT '精品',
  `is_hot` int(2) DEFAULT '0' COMMENT '热销',
  `is_new` int(2) DEFAULT '0' COMMENT '新品',
  `img_list` longtext,
  `content` longtext,
  `goods_type_id` int(11) DEFAULT NULL,
  `relation_goods` varchar(255) DEFAULT NULL,
  `goods_gift` varchar(255) DEFAULT NULL,
  `goods_fitting` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('3', '小米6X', '小米6X', '小米手机，为发烧而生', '1288', '1368', '/public/admin/upload/1567319954719cn6v62trdee.jpg', '50', '14', '1', null, '1', null, '[\"/public/admin/upload/1567319951724cbbkvlbeb2.jpg\",\"/public/admin/upload/1567319951742nos7f7knu3c.jpg\"]', '<p><img src=\"https://img.alicdn.com/imgextra/i3/872196368/O1CN01BSIjDR1wuahZsS0TX_!!872196368.jpg\">&nbsp;&nbsp;<br></p>', '4', '', '', '', '1567319954720', '', '');

-- ----------------------------
-- Table structure for goods_attr
-- ----------------------------
DROP TABLE IF EXISTS `goods_attr`;
CREATE TABLE `goods_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) DEFAULT NULL,
  `attr_id` int(2) DEFAULT NULL,
  `attr_type` int(11) DEFAULT NULL,
  `attr_title` varchar(255) DEFAULT NULL,
  `attr_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_attr
-- ----------------------------
INSERT INTO `goods_attr` VALUES ('37', '3', '4', '1', '型号', '小米6X');
INSERT INTO `goods_attr` VALUES ('38', '3', '5', '1', '屏幕大小（寸）', '5');
INSERT INTO `goods_attr` VALUES ('39', '3', '7', '1', '存储（G）', '4');
INSERT INTO `goods_attr` VALUES ('40', '3', '8', '1', '前置摄像头（像素）', '300万');
INSERT INTO `goods_attr` VALUES ('41', '3', '9', '1', '后置摄像头（像素）', '500万');
INSERT INTO `goods_attr` VALUES ('42', '3', '10', '3', '蓝牙', '支持\r\n');

-- ----------------------------
-- Table structure for goods_cate
-- ----------------------------
DROP TABLE IF EXISTS `goods_cate`;
CREATE TABLE `goods_cate` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `cate_img` varchar(255) DEFAULT NULL,
  `filter_attr` varchar(255) DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `template` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_description` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_cate
-- ----------------------------
INSERT INTO `goods_cate` VALUES ('10', '手机', '', '', '0', '', '', '', '', '1567244102611');
INSERT INTO `goods_cate` VALUES ('12', 'iphone', '/public/admin/upload/15672450112225ariz9227lq.jpg', '', '10', '', '', '', '', '1567245011224');
INSERT INTO `goods_cate` VALUES ('14', '小米', '/public/admin/upload/1567245156876qbbkknat8vd.jpg', '', '10', '', '', '', '', '1567245156985');
INSERT INTO `goods_cate` VALUES ('15', '笔记本', '', '', '0', '', '', '', '', '1567245182099');

-- ----------------------------
-- Table structure for goods_type
-- ----------------------------
DROP TABLE IF EXISTS `goods_type`;
CREATE TABLE `goods_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_type
-- ----------------------------
INSERT INTO `goods_type` VALUES ('2', '笔记本', '便携式电脑', '1', '1566051066959');
INSERT INTO `goods_type` VALUES ('4', '手机', '移动手机', '1', '1567006620689');

-- ----------------------------
-- Table structure for goods_type_attr
-- ----------------------------
DROP TABLE IF EXISTS `goods_type_attr`;
CREATE TABLE `goods_type_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `attr_type` int(2) DEFAULT NULL,
  `attr_value` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_type_attr
-- ----------------------------
INSERT INTO `goods_type_attr` VALUES ('1', '2', '内存', '3', '8G\r\n4G', '1567006245489');
INSERT INTO `goods_type_attr` VALUES ('2', '2', '硬盘', '3', '512G\r\n1T', '1567006529384');
INSERT INTO `goods_type_attr` VALUES ('3', '2', '分辨率', '3', '1336*780\r\n1920*1080', '1567006586922');
INSERT INTO `goods_type_attr` VALUES ('4', '4', '型号', '1', null, '1567006668941');
INSERT INTO `goods_type_attr` VALUES ('5', '4', '屏幕大小（寸）', '1', null, '1567244714173');
INSERT INTO `goods_type_attr` VALUES ('7', '4', '存储（G）', '1', null, '1567244769593');
INSERT INTO `goods_type_attr` VALUES ('8', '4', '前置摄像头（像素）', '1', null, '1567244843579');
INSERT INTO `goods_type_attr` VALUES ('9', '4', '后置摄像头（像素）', '1', null, '1567244856082');
INSERT INTO `goods_type_attr` VALUES ('10', '4', '蓝牙', '3', '支持\r\n不支持', '1567244891252');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int(255) NOT NULL DEFAULT '1',
  `add_time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('6', '网站运维', '网站运维', '1', '1565964616635');
INSERT INTO `role` VALUES ('7', '商品管理', '商品管理', '1', '1565964712756');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `send_code` varchar(6) DEFAULT NULL,
  `send_time` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login_type` int(1) DEFAULT NULL,
  `qq_openId` varchar(255) DEFAULT NULL,
  `wx_openId` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `figureurl` varchar(255) DEFAULT NULL COMMENT '头像',
  `status` int(1) DEFAULT '1',
  `add_time` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', null, null, null, null, null, '1', '9B6C01E2ACF80B2D8307FD8125AFDAA7', null, '8IxMhKsR1567846672670', '不求甚解', 'http://qzapp.qlogo.cn/qzapp/101479867/9B6C01E2ACF80B2D8307FD8125AFDAA7/30', '1', '1567846672670');
INSERT INTO `user` VALUES ('3', null, '17621960934', '909812', '1567920545518', null, '3', null, null, null, null, null, '0', '1567919312130');
