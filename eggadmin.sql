/*
Navicat MySQL Data Transfer

Source Server         : aliyun
Source Server Version : 50633
Source Host           : 47.100.51.191:3306
Source Database       : eggadmin

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2019-08-17 23:53:11
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
INSERT INTO `admin` VALUES ('4', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '17621960934', '531053266@qq.com', '1', '7', '1564068996262', '0');
INSERT INTO `admin` VALUES ('6', 'jack123', 'e10adc3949ba59abbe56e057f20f883e', '17629283762', '384747@qq.com', '0', '6', '1566029128667', '0');

-- ----------------------------
-- Table structure for goodstype
-- ----------------------------
DROP TABLE IF EXISTS `goodstype`;
CREATE TABLE `goodstype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodstype
-- ----------------------------
INSERT INTO `goodstype` VALUES ('2', '笔记本', '便携式电脑', '1', '1566051066959');
INSERT INTO `goodstype` VALUES ('3', '台式机', '台式电脑', '1', '1566052473072');

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
