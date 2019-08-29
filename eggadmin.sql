/*
Navicat MySQL Data Transfer

Source Server         : aliyun
Source Server Version : 50633
Source Host           : 47.100.51.191:3306
Source Database       : eggadmin

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2019-08-29 23:39:40
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
INSERT INTO `admin` VALUES ('6', 'jack123', 'e10adc3949ba59abbe56e057f20f883e', '17629283762', '384747@qq.com', '0', '6', '1566029128667', '0');

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
INSERT INTO `banner` VALUES ('6', '/public/admin/upload/156683160673853hu12wuf0m.jpg', '博客地址', 'https://blog.csdn.net/bocongbo/article/details/83656754', '1', '1566831606739', '100');

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
  `cate_id` int(11) DEFAULT NULL,
  `status` int(2) DEFAULT '1',
  `is_best` int(2) DEFAULT NULL COMMENT '精品',
  `is_hot` int(2) DEFAULT NULL COMMENT '热销',
  `is_new` int(2) DEFAULT NULL COMMENT '新品',
  `img_list` longtext,
  `content` longtext,
  `add_time` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for goods_cate
-- ----------------------------
DROP TABLE IF EXISTS `goods_cate`;
CREATE TABLE `goods_cate` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `cate_img` varchar(255) DEFAULT NULL,
  `filter_attr` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `template` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_description` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_cate
-- ----------------------------
INSERT INTO `goods_cate` VALUES ('3', '商品管理', '/public/admin/upload/1566729657542749p5yzue05.gif', '4321', '5432', '0', '5432', '5432', '4321', 'treetre', '1566729657543');
INSERT INTO `goods_cate` VALUES ('6', '网站运维', '/public/admin/upload/1566730617407rdujgvb9f9b.jpg', '4321', '432', '0', '342', '555', '666', '777', '1566730617407');
INSERT INTO `goods_cate` VALUES ('8', '二级分类', '/public/admin/upload/1566743161877yh54f6ooqvq.jpg', '43', '/uyruwie?id=21', '3', '二七王', '453', '惹我', '太热我以为', '1566743161877');
INSERT INTO `goods_cate` VALUES ('9', '还是二级', '/public/admin/upload/1566743671054vnn280xpdjd.jpg', '4321', '5432', '3', '5454', '二维瑞特', '与他人', '一天热一热', '1566743671055');

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
  `cate_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `attr_type` int(2) DEFAULT NULL,
  `attr_value` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_type_attr
-- ----------------------------
INSERT INTO `goods_type_attr` VALUES ('1', '2', '内存', '3', '8G\r\n4G', '1567006245489');
INSERT INTO `goods_type_attr` VALUES ('2', '2', '硬盘', '3', '512G\r\n1T', '1567006529384');
INSERT INTO `goods_type_attr` VALUES ('3', '2', '分辨率', '3', '1336*780\r\n1920*1080', '1567006586922');
INSERT INTO `goods_type_attr` VALUES ('4', '4', '型号', '1', null, '1567006668941');

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
