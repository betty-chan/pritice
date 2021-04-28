--创建数据库
CREATE DATABASE IF NOT EXISTS learn DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
--删除数据库
drop database IF EXISTS CODES;
--删除表
DROP TABLE IF EXISTS `topic_collect`;
--创建表
CREATE TABLE `topic_collect` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `content` int(10) NOT NULL COMMENT '帖子id',
  `status` int(1) NOT NULL COMMENT '状态1:有效,0:无效',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--清空表
truncate table `topic_collect`;
--插入数据
INSERT INTO ads_report_product_sales 
(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
VALUES ('0343454','toy land','435 Any Street','New York','NY','3333','USA',NULL, NULL);
--更改表名
alter table `topic_collect` rename to `topic_collects`;
--查询元数据
USE information_schema;
SELECT
    C.TABLE_NAME AS '表名' ,
    T.TABLE_COMMENT AS '表说明' ,
    C.COLUMN_NAME AS '字段名',
    C.COLUMN_TYPE AS '数据类型',
    C.IS_NULLABLE AS '允许为空',
    C.EXTRA AS '主键',
    C.COLUMN_COMMENT AS '字段说明'
FROM COLUMNS C
INNER JOIN TABLES T ON C.TABLE_SCHEMA = T.TABLE_SCHEMA AND C.TABLE_NAME = T.TABLE_NAME
WHERE T.TABLE_SCHEMA = 'xboot' and T.TABLE_NAME='t_user'
--导出数据
mysqldump -h[远程数据库ip] -P[数据库端口号] -u[用户名] -p[密码] default-character-set="数据库编码" >db.sql;
--查询日期
select * from dws_adorawe_spu_daily T where T.track_date between '2021-03-21 00:00:00' and '2021-03-28 23:59:59';