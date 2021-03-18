--创建数据库
CREATE DATABASE IF NOT EXISTS learn DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
--删除数据库
drop database IF EXISTS CODES;
--删除表
DROP TABLE IF EXISTS `topic_collect`;
--创建表
CREATE TABLE `topic_collect` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `topic_id` int(10) NOT NULL COMMENT '帖子id',
  `status` int(1) NOT NULL COMMENT '状态1:有效,0:无效',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--清空表
truncate table `topic_collect`;
--更改表名
alter table `topic_collect` rename to `topic_collects`;