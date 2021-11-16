## 操作
```sql
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
--更改表名
ALTER TABLE `topic_collect` rename to `topic_collects`;
--更改表-增加字段
ALTER TABLE `t_permission` ADD COLUMN resource_type VARCHAR(255) DEFAULT NULL COMMENT '资源类型';
--更改表-删除字段
ALTER TABLE `t_permission` Drop COLUMN resource_type, resource_id, resource_params;
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
--清空表
truncate table `topic_collect`;
--插入数据
INSERT INTO ads_report_product_sales 
(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
VALUES ('0343454','toy land','435 Any Street','New York','NY','3333','USA',NULL, NULL);
--删除数据
DELETE FROM runoob_tbl WHERE runoob_id=3
--更新数据
UPDATE runoob_tbl SET runoob_title = REPLACE(runoob_title, 'C++', 'Python'), runoob_id = 4 where runoob_id = 3;
--查询进程
show full processlist;
--停止进程
kill 82547;
```

## 查询
```sql
--查询日期
select * from dws_adorawe_spu_daily T where T.track_date between '2021-03-21 00:00:00' and '2021-03-28 23:59:59';
select * from dws_adorawe_spu_daily T where T.track_date >= '2021-03-21 00:00:00' and T.track_date <= '2021-03-28 23:59:59';
--查询七天前
SELECT If(count(*)>0,"异常","正常") as `status`, opdate as date FROM `ads_usr_sensor_order_monitoring_di`
WHERE shop_name REGEXP "adorawe|soulmia" and opdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY date
--按周分组，返回周一
select 
  vendor as name, IFNULL(roi,0) as y,
  DATE_ADD('1900-01-01',INTERVAL FLOOR(DATEDIFF(bizdate, '1900-01-01') / 7) * 7 DAY) AS x
  from ads_report_daily_report ardr
  where ardr.bizdate > "2021-04-21"
  and ardr.bizdate < "2021-04-29"
group by name, x
--按周分组
select 
  vendor as name, IFNULL(roi,0) as y,
  DATE_FORMAT(bizdate,"%Y-%u") as x
  from ads_report_daily_report ardr
  where ardr.bizdate > "2021-04-21"
  and ardr.bizdate < "2021-04-29"
group by name, x
--使用正则
select * from `rule` WHERE user_name REGEXP '[a-z]+';
--查询去重
select DISTINCT user_name from `rule` WHERE user_name REGEXP '[a-z]+';
--IN和NO IN的使用
select count(user_name), user_name from `rule` WHERE user_name REGEXP '[a-z]+' and user_name NOT IN ("admin","chenxin")  GROUP BY user_name;
--模糊查询，包含和不包含
select * from `rule` WHERE user_name like concat('%','122','%') and user_name not like concat('%','34','%');
--1对多取最新的
select crowd.id,crowd_name,crowd_desc,custom_field,crowd.create_time,crowd.update_time,crowd.created_by,crowd.period_start_time,crowd.period_end_time,status,pli.push_task_type as pushTaskType, pli.period_end_time as pushEndTime
from crowd left join push_label_info as pli
on pli.id =  (
    select pli_in.id
    from push_label_info as pli_in
    where pli_in.crowd_id = crowd.id
    order by pli_in.create_time desc
    limit 1
)
WHERE crowd.shop_type = 'S'
-- COUNT使用：1.COUNT(`event`) 2.COUNT(DISTINCT event)去重 3.COUNT和IF、CASE使用，如COUNT(IF(event='webClick',1, NULL)) 等于某个值 4.COUNT(*)表中行数
SELECT COUNT(`event`) as pv , COUNT(DISTINCT event) as uv , currency_page FROM `data_event` WHERE event="pageView" GROUP BY currency_page
select count(*) as sum from `rule`;
```
### 流程控制
```sql
-- IF使用，IF(expr,result_true,result_false)
-- IFNULL(expression, alt_value)
-- NOT ISNULL(expression)

-- CASE使用:简单函数
SELECT *,
(CASE sex  # 注意此处 sex
            WHEN '1' THEN '男'
            WHEN '0' THEN '女'
            ELSE '保密'
END)
FROM USER
-- CASE使用:搜索函数
SELECT OrderID, Quantity,
(CASE
    WHEN Quantity = 30 THEN "The quantity is 30"
    ELSE "The quantity is under 30"
END)
FROM OrderDetails;
```

### 排序
```sql
-- 查询不并列连续排名：row_number() over(partition by shop_name,country order by sum(combination_usd) desc)
-- 查询并列不连续排名：rank() over(partition by shop_name,country order by sum(combination_usd) desc)
-- 查询并列连续排名（默认）：dense_rank() over(partition by shop_name,country order by sum(combination_usd) desc)
SELECT shop_name,country,
first_category,
sum(combination_usd) usd ,
rank() over(partition by shop_name,country order by sum(combination_usd) desc)  as rk 
FROM `ads_cm_vivaia_first_category_combination`
where country in ('australia','united states') and opdate >='2021-10-03' and shop_id=1809
group by shop_name,country,first_category
order by shop_name,country, rk 
--根据查询语句顺序排序
select sku_code from ads_ops_goods_dim_sku where sku_code in ('XXMX02005015','XXMX02013007','XXMT00375004','XXMX01985003') order by field(sku_code,'XXMX02005015','XXMX02013007','XXMT00375004','XXMX01985003')
---根据数值从小到大排序，默认null排后面
select vendor_name vender from  `config`.role_store_permission rsp
order by weight is  null, weight asc, vender
```